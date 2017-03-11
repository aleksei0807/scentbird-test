/* @flow */
import React, { Component, PropTypes } from 'react';
import type { Element } from 'react'; // eslint-disable-line no-duplicate-imports
import CSSModules from 'react-css-modules';
import AutoComplete from 'material-ui/AutoComplete';
import styles from './index.css';

@CSSModules(styles, { allowMultiple: true })
export default class AutoInput extends Component {
	/* eslint-disable react/sort-comp */
	focused: boolean;
	styleProps: Object;
	customOnNewRequest: ?Function;
	customOnUpdateInput: ?Function;
	customOnBlur: ?Function;
	customOnFocus: ?Function;
	value: string;
	prestine: boolean;
	requiredRequested: boolean;
	state: {
		floatingLabelStyle: Object;
	};
	/* eslint-enable react/sort-comp */

	static propTypes = {
		defaultValue: PropTypes.any,
		name: PropTypes.string.isRequired,
		onBlur: PropTypes.func,
		onNewRequest: PropTypes.func,
		onUpdateInput: PropTypes.func,
		onFocus: PropTypes.func,
		onKeyDown: PropTypes.func,
		value: PropTypes.any,
		required: PropTypes.bool,
	};

	constructor(...args: Array<*>): void {
		super(...args);
		this.focused = false;
		this.prestine = true;
		this.requiredRequested = false;
		this.styleProps = {
			underlineShow: false,
			floatingLabelFocusStyle: {
				backgroundColor: '#fff',
				left: 10,
				paddingLeft: 5,
				paddingRight: 5,
				transform: 'scale(1) translate(0px, -27px)',
				fontSize: '16px',
				color: '#9b9b9b',
			},
			style: {
				height: 50,
				width: null,
				display: null,
			},
			inputStyle: {
				margin: 0,
				font: null,
				border: '1px solid #e6e6e6',
				backgroundColor: '#fafafa',
			},
			errorStyle: {
				position: 'absolute',
				bottom: -15,
				fontSize: 12,
				color: '#f00',
			},
			hintStyle: {
				border: null,
			},
			fullWidth: true,
			openOnFocus: true,
			maxSearchResults: 5,
		};
		this.value = '';
		this.state = {
			floatingLabelStyle: {
				backgroundColor: 'transparent',
				marginLeft: 0,
				top: 14,
				left: 15,
			},
		};
	}

	onNewRequest = (choosen: string, index: number): void => {
		if (this.prestine) {
			return;
		}
		this.value = choosen;
		this.calculateOpacity(choosen);
		if (this.props.onNewRequest) {
			this.props.onNewRequest(choosen, index);
		}
	}
	onUpdateInput = (searchText: string, dataSource: Array<*>, params: Object): void => {
		if (this.prestine) {
			return;
		}
		this.value = searchText;
		this.calculateOpacity(searchText);
		if (this.props.onUpdateInput) {
			this.props.onUpdateInput(searchText, dataSource, params);
		}
	}

	calculateOpacity = (v: string): void => {
		this.setState({
			floatingLabelStyle: {
				...this.state.floatingLabelStyle,
				...{opacity: v === '' || this.focused ? 1 : 0},
			},
		});
	}

	onFocus = (...args: Array<*>): void => {
		this.focused = true;
		this.prestine = false;
		this.calculateOpacity(this.value);
		if (this.props.onFocus) {
			this.props.onFocus(...args);
		}
	}

	onBlur = (...args: Array<*>): void => {
		this.focused = false;
		this.prestine = false;
		this.calculateOpacity(this.value);
		if (this.props.onBlur) {
			this.props.onBlur(...args);
		}
	}

	required = (): boolean => (
		!this.prestine && this.requiredRequested
	)

	validateRequired = (): boolean | string => {
		if (!this.prestine && this.requiredRequested && !this.value) {
			return 'This field is required';
		}
		return false;
	}

	render(): Element<{className: ?string}> {
		const props = {...{
			...this.styleProps,
			...this.props,
			...{floatingLabelStyle: this.state.floatingLabelStyle},
		}};
		const containerClassName = props.className;

		if (this.props.required) {
			this.requiredRequested = true;
			props.validations = {
				...props.validations,
				validateRequired: this.validateRequired,
			};
		}
		if (this.props.value) {
			this.value = this.props.value;
		}
		delete props.styles;
		delete props.required;
		delete props.className;
		delete props.validationError;
		delete props.validationErrors;
		delete props.onNewRequest;
		delete props.onUpdateInput;

		return (
			<div style={{position: 'relative'}} className={containerClassName || null}>
				<AutoComplete
					{...props}
					required={this.required()}
					open={this.focused}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onNewRequest={this.onNewRequest}
					onUpdateInput={this.onUpdateInput}
					styleName="input-container"
					/>
				{this.validateRequired()
					? <div style={this.styleProps.errorStyle}>{this.validateRequired()}</div>
					: null
				}
			</div>
		);
	}
}
