/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Form } from 'formsy';
import { setData } from '../../actions/data';
import Input from '../../components/Input';
import safe from './images/safe.svg';
import cards from './images/cards.png';
import styles from './index.css';

const mapStateToProps = state => ({
	paymentData: state.data.get('payment'),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles, { errorWhenNotFound: false })
export default class Payment extends Component {
	static propTypes = {
		paymentData: PropTypes.object,
	};

	setData = (path: Array<string>, value: any) => {
		this.props.setData(['payment', ...path], value);
	}

	render() {
		return (
			<div styleName="container">
				<h1 styleName="title">Secure credit card payment</h1>
				<div styleName="content">
					<div styleName="top">
						<div styleName="safe">
							<img src={safe} alt="safe" />
							<span>128-BIT ENCRYPTION. YOU’RE SAFE</span>
						</div>
						<img styleName="cards" src={cards} alt="credit cards" />
					</div>
					<Form name="payment">
						<div styleName="second-form-wrapper">
							<div styleName="credit-card-number">
								<Input
									name="credit-card-number"
									floatingLabelText="Credit card number"
									className={styles.numberInput}
									/>
								<div styleName="lock"></div>
							</div>
							<Input
								styleName="security-code"
								name="security-code"
								floatingLabelText="Security code"
								/>
							<span styleName="faq"></span>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}
