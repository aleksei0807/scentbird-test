/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ErrorComponent from '../../components/Error';
import CreateAccount from '../CreateAccount';
import Subscription from '../Subscription';
import Address from '../Address';
import Payment from '../Payment';
import Logo from '../../components/Logo';
import ProductInfo from '../../components/ProductInfo';
import Chicken from '../../components/Chicken';
import Tick from '../../components/Tick';
import { setData } from '../../actions/data';
import arrow from './images/arrow.svg';
import {
	subscriptionOnlySmallScreen,
	billingAddressShowName,
	billingAddressShowPhone,
} from '../../../config.json';
import styles from './index.css';

const mapStateToProps = state => ({
	errorMessage: state.error.message,
	showBillingAddres: state.data.get('showBillingAddres'),
});

/* eslint-disable max-len */
const bottomText = 'You will receive an email confirmation when recipient accepts your gift. Scentbird ships between the 15th and the 18th of every month. Recipient will receive an email confirmation of shipment every month. Please allow 5-7 days for delivery.';
/* eslint-enable max-len */

@connect(mapStateToProps, { setData })
@CSSModules(styles, { errorWhenNotFound: false })
export default class General extends Component {
	static propTypes = {
		errorMessage: PropTypes.string,
		showBillingAddres: PropTypes.bool,
	};

	toggleTick = () => {
		this.props.setData(['showBillingAddres'], !this.props.showBillingAddres);
	}

	render() {
		const { errorMessage, showBillingAddres } = this.props;

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

						<Subscription onlySmallScreen={subscriptionOnlySmallScreen} />

						<CreateAccount />

						<Address type="shipping" showName showPhone />

						<div onClick={this.toggleTick} styleName="billing-address-toggle-container">
							<div styleName="tick-container">
								<div
									styleName="tick"
									style={{
										display: !showBillingAddres ? 'block' : 'none',
									}}>
									<Tick color="#fff" />
								</div>
							</div>
							<span styleName="use-this-address">Use this address as my billing address</span>
						</div>

						{ showBillingAddres
							? <Address
								type="billing"
								showName={billingAddressShowName}
								showPhone={billingAddressShowPhone}
								/>
							: null
						}

						<Payment />
						
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
