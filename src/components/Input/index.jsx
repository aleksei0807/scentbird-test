/* @flow */
import React, { Component, PropTypes } from 'react';
import type { Element } from 'react'; // eslint-disable-line no-duplicate-imports
import CSSModules from 'react-css-modules';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import styles from './index.css';

@CSSModules(styles, { allowMultiple: true })
export default class Input extends Component {
	/* eslint-disable react/sort-comp */
	focused: boolean;
	styleProps: {
		floatingLabelFocusStyle: Object;
		style: Object;
		inputStyle: Object;
		errorStyle: Object;
		hintStyle: Object;
		underlineShow: false; // values required to be compatible
		fullWidth: true;      // with company style guides
	};
	customOnChange: ?Function;
	customOnBlur: ?Function;
	customOnFocus: ?Function;
	value: string;
	state: {
		floatingLabelStyle: Object;
	};
	/* eslint-enable react/sort-comp */

	static propTypes = {
		defaultValue: PropTypes.any,
		name: PropTypes.string.isRequired,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onKeyDown: PropTypes.func,
		value: PropTypes.any,
	};

	constructor(...args: Array<*>): void {
		super(...args);

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
				bottom: -20,
				color: '#f00',
			},
			hintStyle: {
				border: null,
			},
			fullWidth: true,
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

	onChange = (event: Object, newValue: string): void => {
		this.value = newValue;
		this.calculateOpacity(newValue);
		if (this.customOnChange) {
			this.customOnChange(event, newValue);
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
		this.calculateOpacity(this.value);
		if (this.customOnFocus) {
			this.customOnFocus(...args);
		}
	}

	onBlur = (e: UIEvent): void => {
		this.focused = false;
		let newValue: string = '';
		if (e.target instanceof HTMLInputElement) {
			newValue = e.target.value;
		}
		this.onChange(e, newValue);
		if (this.customOnBlur) {
			this.customOnBlur(e);
		}
	}

	render(): Element<{className: ?string}> {
		const props = {...{
			...this.styleProps,
			...this.props,
			...{floatingLabelStyle: this.state.floatingLabelStyle},
		}};
		const containerClassName = props.className;

		this.customOnChange = props.onChange;
		this.customOnFocus = props.onFocus;
		this.customOnBlur = props.onBlur;
		if (props.value) {
			this.value = props.value;
		}
		delete props.styles;
		delete props.className;

		return (
			<div className={containerClassName || null}>
				<FormsyText
					{...props}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onChange={this.onChange}
					styleName="input-container"
					/>
			</div>
		);
	}
}
