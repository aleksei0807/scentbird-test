import React, { Component } from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import mixin from 'react-mixin';
import AutoComplete from 'material-ui/AutoComplete';
import { setMuiComponentAndMaybeFocus } from 'formsy-react/src/utils';

class FormsyAutoComplete extends Component {
	static propTypes = {
		defaultValue: React.PropTypes.any,
		name: React.PropTypes.string.isRequired,
		onBlur: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onKeyDown: React.PropTypes.func,
		value: React.PropTypes.any,
	};

	constructor(...args) {
		super(args);
		console.dir(this.context);
		this.state = {
			value: this.props.defaultValue || this.props.value || '',
		};
	}

	componentWillMount() {
		this.setValue(this.props.defaultValue || this.props.value || '');
	}

	setMuiComponentAndMaybeFocus = setMuiComponentAndMaybeFocus;

	handleBlur = (event) => {
		this.setValue(event.currentTarget.value);
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	handleChange = (event) => {
		this.setState({
			value: event.currentTarget.value,
		});
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}

	handleUpdateInput = (value) => {
		this.setState({
			value,
		});
		if (this.props.onChange) {
			this.props.onChange(null, value);
		}
	}

	handleKeyDown = (event) => {
		if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
		if (this.props.onKeyDown) {
			this.props.onKeyDown(event, event.currentTarget.value);
		}
	}


	render() {
		const {
			defaultValue, // eslint-disable-line no-unused-vars
			onFocus,
			value, // eslint-disable-line no-unused-vars
			...rest } = this.props;
		return (
			<AutoComplete
				disabled={this.isFormDisabled()}
				{...rest}
				errorText={this.getErrorMessage()}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onUpdateInput={this.handleUpdateInput}
				onFocus={onFocus}
				onKeyDown={this.handleKeyDown}
				ref={this.setMuiComponentAndMaybeFocus}
				value={this.state.value}
				/>
		);
	}
}

mixin(FormsyAutoComplete.prototype, Formsy.Mixin);
export default FormsyAutoComplete;
