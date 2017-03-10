/* @flow */
import React, { Component, PropTypes } from 'react';
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
import countriesJSON from './countries.en_US.json';


const googleAPIKey: string = 'AIzaSyC7MKR8tBlhRTI-RxnePPXyky_atZG2_8Q';
const countries: Array<{key: string; name: string}> = [...countriesJSON]; // we should have .each()
const countriesFormatted: Array<string> = countries.map(v => v.name);
const countryToCode: Object = countries.reduce((collect, v) => (
	{...collect, ...{[v.name]: v.key}}
), {});

const mapStateToProps = (state: Object, props: Object): Object => ({
	addressData: state.data.get(props.type),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles, { allowMultiple: true })
export default class Address extends Component {
	/* eslint-disable react/sort-comp */
	streetEmitter: ?Emitter<*, *>;
	state: {
		zipValid: boolean;
		streetSuggestData: Array<*>;
		streetRawData: {
			results: Array<*>;
		};
	};
	/* eslint-enable react/sort-comp */

	static propTypes: Object = {
		type: PropTypes.string.isRequired,
		addressData: PropTypes.object,
	};

	constructor(...args: Array<*>): void {
		super(...args);

		this.state = {
			zipValid: false,
			streetSuggestData: [],
			streetRawData: {
				results: [],
			},
		};
	}

	componentDidMount(): void {
		stream((emitter: Emitter<*, *>) => {
			this.streetEmitter = emitter;
		})
		.debounce(400)
		.onValue(this.streetSuggest);
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
		if (this.isZipValid({}, e.target.value) === true) {
			this.setData(['zip'], e.target.value);
		}
	}

	streetSuggest = (e: Object): void => {
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

	streetChoosed = (data: {results: Array<*>}) => ((selectedText: string, idx: number) => {
		console.log(data.results[idx].address_components.reduce((collector: Object, v: Object) => (
			{
				...collector,
				...{[v.types[0]]: v},
			}
		), {}));
	})

	countriesFilter = (searchText: string, name: any): boolean => (
		searchText !== ''
			&& (name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
			|| countryToCode[name].toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
	)

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
						<Input
							styleName="col-1of3 field"
							name="apt1"
							floatingLabelText="Apt/Suite (Optional)"
							/>
						<Input
							styleName="col-1of3 field"
							name="apt2"
							floatingLabelText="Apt/Suite (Optional)"
							/>
					</div>
					<AutoInput
						dataSource={countriesFormatted}
						filter={this.countriesFilter}
						styleName="country field"
						name="country"
						floatingLabelText="Country"
						/>
				</Form>
			</div>
		);
	}
}
