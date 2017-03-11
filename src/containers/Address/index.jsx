/* @flow */
import React, { Component, PropTypes } from 'react';
import { Map as IMap } from 'immutable';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Form } from 'formsy';
import { stream } from 'kefir';

/* eslint-disable no-duplicate-imports */
import type { Emitter } from 'kefir';
import type { Element } from 'react';
/* eslint-enable no-duplicate-imports */

import { setData } from '../../actions/data';
import Input from '../../components/Input';
import AutoInput from '../../components/AutoInput';
import Tick from '../../components/Tick';
import styles from './index.css';
// import countriesJSON from './countries.en_US.json';
import tr from '../../utils/transliterator';
import getCountries from '../../utils/getCountries';
import getRegions from '../../utils/getRegions';
import getCities from '../../utils/getCities';

const googleAPIKey: string = 'AIzaSyC7MKR8tBlhRTI-RxnePPXyky_atZG2_8Q';

// const
// countries: Array<{key: string; name: string}> = [...countriesJSON]; // we should have .each()
// const countriesFormatted: Array<string> = countries.map(v => v.name);
// const countryToCode: Object = countries.reduce((collect, v) => (
	// {...collect, ...{[v.name]: v.key}}
// ), {});

const mapStateToProps = (state: Object, props: Object): Object => ({
	addressData: state.data.get(props.type),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles, { allowMultiple: true })
export default class Address extends Component {
	/* eslint-disable react/sort-comp */
	streetEmitter: ?Emitter<*, *>;
	regionState: string;
	streetState: string;
	cityState: string;
	countryState: string;
	state: {
		zipValid: boolean;
		streetSuggestData: Array<*>;
		streetRawData: {
			results: Array<*>;
		};
		countries: Array<Object>;
		countriesList: Array<*>;
		countryNameToCountryObject: Object;
		regions: Array<Object>;
		regionsList: Array<*>;
		regionNameToRegionObject: Object;
		cities: Array<Object>;
		citiesList: Array<*>;
		cityNameToCityObject: Object;
	};
	/* eslint-enable react/sort-comp */

	static propTypes: Object = {
		type: PropTypes.string.isRequired,
		addressData: PropTypes.object,
	};

	constructor(...args: Array<*>): void {
		super(...args);
		this.props.setData([this.props.type], IMap());
		this.regionState = '';
		this.streetState = '';
		this.cityState = '';
		this.countryState = '';
		this.state = {
			zipValid: false,
			streetSuggestData: [],
			streetRawData: {
				results: [],
			},
			countries: [],
			countriesList: [],
			countryNameToCountryObject: {},
			regions: [],
			regionsList: [],
			regionNameToRegionObject: {},
			cities: [],
			citiesList: [],
			cityNameToCityObject: {},
		};
	}

	componentDidMount(): void {
		stream((emitter: Emitter<*, *>) => {
			this.streetEmitter = emitter;
		})
		.debounce(400)
		.onValue(this.streetSuggest);

		getCountries((err, data) => {
			this.setState({
				countries: data.response.items,
				countriesList: data.response.items.map(v => v.title),
				countryNameToCountryObject: data.response.items.reduce(
					(collector, v) => ({
						...collector,
						...{[v.title]: v},
					}),
					{}
				),
			});
		});
	}

	setData = (path: Array<string>, value: any): void => {
		this.props.setData([this.props.type, ...path], value);
	}

	getData = (path: string, defaultValue: any): any => {
		if (this.props.addressData) {
			return this.props.addressData.get(path) || defaultValue;
		}
		return defaultValue;
	}

	getInData = (path: Array<string>, defaultValue: any): any => {
		if (this.props.addressData) {
			return this.props.addressData.getIn(path) || defaultValue;
		}
		return defaultValue;
	}

	isZipValid = (form: Object, field: string): boolean | string => {
		if (/[a-zA-Z0-9-\s]{4,}/.test(field)) {
			this.setState({
				zipValid: true,
			});
			return true;
		}
		this.setState({
			zipValid: false,
		});
		return field === '' ? false : 'Invalid zip code';
	}

	zipChanged = (e: {target: { value: string }}): void => {
		this.setData(['zip'], e.target.value);
	}

	streetSuggest = (e: Object): void => {
		this.streetState = e.target.value;
		if (!e.searchText) {
			return;
		}
		const q = encodeURIComponent(e.searchText);
		const addr = `https://maps.googleapis.com/maps/api/geocode/json?address=${q}&key=${googleAPIKey}`;

		fetch(addr, {
			method: 'GET',
		})
		.then((res: fetch) => res.json())
		.then((res: {results: Array<Object>; status: string}) => {
			if (!res.results || res.status !== 'OK') {
				return {formatted: [], raw: {results: [], status: 'error'}};
			}
			return {
				formatted: res.results.map((v: {formatted_address: string}) => v.formatted_address),
				raw: res,
			};
		})
		.then((res: {formatted: Array<string>; raw: {results: Array<Object>; status: string}}) => {
			this.setState({
				streetSuggestData: res.formatted,
				streetRawData: res.raw,
			});
		})
		.catch((reason) => {
			console.error(reason);
		});
	}

	streetChange = (searchText: string, dataSource: Array<*>, params: Object) => {
		if (this.streetEmitter) {
			this.streetEmitter.emit({searchText, dataSource, params});
		}
	}

	streetChoosed = () => ((selectedText: string) => {
		this.setData(['street'], selectedText);
	})

	countryShouldBeInList = (searchText: string) => (
		(v: Object) => {
			const passed = v.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
			|| v.title.toLowerCase().indexOf(tr(searchText).toLowerCase()) !== -1
			|| tr(v.title).toLowerCase().indexOf(tr(searchText).toLowerCase()) !== -1
			|| tr(v.title).toLowerCase().indexOf(searchText.toLowerCase()) !== -1
			|| tr(v.title).toLowerCase() === tr(searchText).toLowerCase()
			|| v.title.toLowerCase() === searchText.toLowerCase()
			|| v.title.toLowerCase() === tr(searchText).toLowerCase()
			|| tr(v.title).toLowerCase() === searchText.toLowerCase();
			return passed;
		}
	)

	countryUpdate = (searchText: string): void => {
		if (searchText === '') {
			this.setState({
				countriesList: this.state.countries.map(v => v.title),
			});
		}
		const cl = this.state.countries
		.filter(this.countryShouldBeInList(searchText))
		.map((v) => (
			v.title
		));
		this.setState({
			countriesList: cl,
		});
	}

	countryChoosed = (countryName: string): void => {
		const country = this.state.countryNameToCountryObject[countryName];
		this.countryState = countryName;
		this.setData(['country'], country);
		this.loadRegions(country);
	}

	loadRegions = (country: {id: number; title: string}) => {
		getRegions({countryID: country.id}, (err, data) => {
			this.setState({
				regions: data.response.items,
				regionsList: data.response.items.map(v => v.title),
				regionNameToRegionObject: data.response.items.reduce(
					(collector, v) => ({ ...collector, ...{[v.title]: v}}),
					{}
				),
			});
		});
	}

	regionSelected = (regionName: string) => {
		const region = this.state.regionNameToRegionObject[regionName];
		this.regionState = regionName;
		this.setData(['region'], region);
		this.loadCities(region);
	}

	regionUpdated = (searchText: string) => {
		this.regionState = searchText;
		getRegions({
			countryID: this.getData('country', {id: 0}).id,
			query: searchText,
		}, (err, data) => {
			this.setState({
				regions: data.response.items,
				regionsList: data.response.items.map(v => v.title),
				regionNameToRegionObject: data.response.items.reduce(
					(collector, v) => ({ ...collector, ...{[v.title]: v}}),
					{}
				),
			});
		});
	}

	regionBlur = () => {
		const r = this.getData('region');
		if ((r && r.title === this.regionState)
			|| this.state.regionNameToRegionObject) {
			return;
		}
		this.setData(
			['region'],
			this.state.regionNameToRegionObject[this.regionState]
				|| {id: -1, title: this.regionState}
		);
	}
	streetBlur = () => {
		if (this.getData('city') === this.streetState) {
			return;
		}
		this.setData(
			['street'],
			this.streetState
		);
	}
	countryBlur = () => {
		const c = this.getData('country');
		if ((c && c.title === this.countryState)
			|| !this.state.countryNameToCountryObject) {
			return;
		}
		this.setData(
			['country'],
			this.state.countryNameToCountryObject[this.countryState]
				|| {id: -1, title: this.countryState}
		);
	}

	loadCities = (region: {id: number; title: string}): void => {
		getCities({
			countryID: this.getData('country', {id: 0}).id,
			regionID: region.id,
		}, (err, data) => {
			this.setState({
				cities: data.response.items,
				citiesList: data.response.items.map(v => v.title),
				cityNameToCityObject: data.response.items.reduce(
					(collector, v) => ({ ...collector, ...{[v.title]: v}}),
					{}
				),
			});
		});
	}

	cityBlur = () => {
		const c = this.getData('city');
		if ((c && c.title === this.cityState)
			|| !this.state.cityNameToCityObject) {
			console.log('return');
			return;
		}
		this.setData(
			['city'],
			this.state.cityNameToCityObject[this.cityState]
				|| {id: -1, title: this.cityState}
		);
	}
	cityUpdated = (searchText: string) => {
		this.cityState = searchText;
		getCities({
			countryID: this.getData('country', {id: 0}).id,
			regionID: this.getData('region', {id: 0}).id,
			query: searchText,
		}, (err, data) => {
			this.setState({
				cities: data.response.items,
				citiesList: data.response.items.map(v => v.title),
				cityNameToCityObject: data.response.items.reduce(
					(collector, v) => ({ ...collector, ...{[v.title]: v}}),
					{}
				),
			});
		});
	}

	citySelected = (cityName: string) => {
		const city = this.state.cityNameToCityObject[cityName];
		this.cityState = cityName;
		this.setData(['city'], city);
	}

	render(): Element<{styleName: string}> {
		return (
			<div styleName="container">
				<h1 styleName="formName">{this.props.type} address</h1>
				<Form
					name={this.props.type}>
					<Input styleName="firstName field" name="firstName" floatingLabelText="First name" />
					<Input styleName="lastName field" name="lastName" floatingLabelText="Last name" />
					<div styleName="group">
						<AutoInput
							styleName="street field"
							onUpdateInput={this.streetChange}
							onNewRequest={this.streetChoosed(this.state.streetRawData)}
							dataSource={this.state.streetSuggestData}
							onBlur={this.streetBlur}
							filter={(searchText: string, key: any) => (
								searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
							)}
							name="street"
							floatingLabelText="Street adress"
							/>
						<Input styleName="apt field" name="apt" floatingLabelText="Apt/Suite (Optional)" />
					</div>
					<div styleName="group">
						<div styleName="field col-1of3 zip-container">
							<Input
								styleName=""
								validations={{ isZipValid: this.isZipValid}}
								name="zip"
								onChange={this.zipChanged}
								value={this.getData('zip')}
								floatingLabelText="Zip code"
								/>
							<Tick
								styleName={`zip-tick${this.state.zipValid ? ' valid' : ''}`}
								color="rgba(255, 69, 143, 0.6)"
								/>
						</div>
						<AutoInput
							dataSource={this.state.regionsList}
							onUpdateInput={this.regionUpdated}
							onNewRequest={this.regionSelected}
							onBlur={this.regionBlur}
							styleName="col-1of3 field"
							name="region"
							floatingLabelText="Region / State"
							disabled={!this.getData('country', false)}
							required
							filter={() => true}
							/>
						<AutoInput
							dataSource={this.state.citiesList}
							onUpdateInput={this.cityUpdated}
							onNewRequest={this.citySelected}
							onBlur={this.cityBlur}
							styleName="col-1of3 field"
							name="city"
							floatingLabelText="City"
							disabled={!this.getData('country', false) || !this.getData('region', false)}
							required
							filter={() => true}
							/>
					</div>
					<AutoInput
						dataSource={this.state.countriesList}
						onUpdateInput={this.countryUpdate}
						onNewRequest={this.countryChoosed}
						onBlur={this.countryBlur}
						styleName="country field"
						name="country"
						floatingLabelText="Country"
						openOnFocus
						required
						filter={() => true}
						/>
				</Form>
			</div>
		);
	}
}
