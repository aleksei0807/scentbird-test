/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Form } from 'formsy';
import { setData } from '../../actions/data';
import Input from '../../components/Input';
import styles from './index.css';

const mapStateToProps = (state, props) => ({
	addressData: state.data.getIn([props.type]),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles)
export default class Address extends Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		addressData: PropTypes.object,
	};

	componentDidMount() {
		this.setData(['firstName'], `олляля ${this.props.type}`);
	}

	setData = (path: Array<string>, value: any) => {
		this.props.setData([this.props.type, ...path], value);
	}

	render() {
		return (
			<div>
				<h1 styleName="formName">{this.props.type} address</h1>
				<Form name={this.props.type}>
					<Input styleName="firstName" name="firstName" floatingLabelText="First name" />
					<Input name="lastName" floatingLabelText="Last name" />
				</Form>
			</div>
		);
	}
}
