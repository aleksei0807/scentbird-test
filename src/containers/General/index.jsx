/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ErrorComponent from '../../components/Error';
import Address from '../Address';
import Logo from '../../components/Logo';
import styles from './index.css';

const mapStateToProps = state => ({
	errorMessage: state.error.message,
});

@connect(mapStateToProps)
@CSSModules(styles, { errorWhenNotFound: false })
export default class General extends Component {
	static propTypes = {
		errorMessage: PropTypes.string,
	};

	render() {
		const { errorMessage } = this.props;

		return (
			<div styleName="container">
				<header>
					<Logo height={39} />
				</header>
				<div styleName="content">
					<div styleName="left-column">
						<div styleName="left-column-top">
							левая колонка верх
						</div>
						<div styleName="left-column-bottom">
							левая колонка низ
						</div>
					</div>
					<div styleName="right-column">
						<Address type="shipping" />
						<Address type="billing" />
					</div>
					<div styleName="left-column-bottom-small">
						левая колонка низ small
					</div>
				</div>
				<ErrorComponent message={errorMessage} />
			</div>
		);
	}
}
