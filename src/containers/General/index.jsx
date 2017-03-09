/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ErrorComponent from '../../components/Error';
import CreateAccount from '../CreateAccount';
import Address from '../Address';
import Logo from '../../components/Logo';
import ProductInfo from '../../components/ProductInfo';
import Chicken from '../../components/Chicken';
import arrow from './images/arrow.svg';
import styles from './index.css';

const mapStateToProps = state => ({
	errorMessage: state.error.message,
});

/* eslint-disable max-len */
const bottomText = 'You will receive an email confirmation when recipient accepts your gift. Scentbird ships between the 15th and the 18th of every month. Recipient will receive an email confirmation of shipment every month. Please allow 5-7 days for delivery.';
/* eslint-enable max-len */

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
					<Logo />
				</header>
				<div styleName="content">
					<div styleName="left-column">
						<div styleName="left-column-top">
							<ProductInfo />
						</div>
						<div styleName="left-column-bottom">
							<Chicken />
							<p styleName="bottom-text">{bottomText}</p>
						</div>
					</div>
					<div styleName="right-column">
						<h1 styleName="title">MONTH-TO-MONTH SUBSCRIPTION</h1>
						<h3 styleName="subtitle">
							Billed monthly. Renews automatically, cancel any time. Free shipping.
						</h3>
						<CreateAccount />
						<Address type="shipping" />
						<Address type="billing" />
						<div styleName="buttons-container">
							<a href="#" styleName="back-link">Back</a>
							<button type="button" styleName="button">
								BUY NOW
								<img styleName="arrow" src={arrow} alt="->" />
							</button>
						</div>
					</div>
					<div styleName="left-column-bottom-small">
						<Chicken />
						<p styleName="bottom-text">{bottomText}</p>
					</div>
				</div>
				<ErrorComponent message={errorMessage} />
			</div>
		);
	}
}
