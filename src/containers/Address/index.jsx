/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { setData } from '../../actions/data';
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
				{ this.props.addressData && this.props.addressData.get('firstName') }
			</div>
		);
	}
}
