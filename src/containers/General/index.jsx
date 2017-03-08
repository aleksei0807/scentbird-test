/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ErrorComponent from '../../components/Error';
import Address from '../Address';
import styles from './index.css';

const mapStateToProps = state => ({
	errorMessage: state.error.message,
});

@connect(mapStateToProps)
@CSSModules(styles)
export default class General extends Component {
	static propTypes = {
		errorMessage: PropTypes.string,
	};

	render() {
		const { errorMessage } = this.props;

		return (
			<div>
				<header>хидер</header>
				<div>
					левая колонка
				</div>
				<div>
					<Address type="shipping" />
					<Address type="billing" />
				</div>
				<ErrorComponent message={errorMessage} />
			</div>
		);
	}
}
