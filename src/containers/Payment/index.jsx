/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Form } from 'formsy';
import cardValidator from 'card-validator';
import { setData } from '../../actions/data';
import Input from '../../components/Input';
import FaqContent from '../../components/FaqContent';
import AutoInput from '../../components/AutoInput';
import safe from './images/safe.svg';
import visa from './images/visa.png';
import mastercard from './images/master.png';
import maestro from './images/maestro.png';
import discover from './images/discover.png';
import americanExpress from './images/american.png';
import styles from './index.css';

const mapStateToProps = state => ({
	paymentData: state.data.get('payment'),
});

const months = Array.from({length: 12}).map((v, key) => {
	const n = key + 1;
	if (n < 10) {
		return `0${n}`;
	}
	return `${n}`;
});

const years = Array.from({length: 19}).map((v, key) => {
	const d = new Date();
	return `${d.getFullYear() + key}`;
});

@connect(mapStateToProps, { setData })
@CSSModules(styles, { errorWhenNotFound: false, allowMultiple: true })
export default class Payment extends Component {
	static propTypes = {
		paymentData: PropTypes.object,
	};

	/* eslint-disable react/sort-comp */
	expMonthState: string;
	expYearState: string;
	state: {
		showFaqContent: boolean;
		cardType: string;
		cvvLength: number;
		yearForceRender: boolean;
	};

	constructor(...args: Array<*>) {
		super(...args);

		this.state = {
			showFaqContent: false,
			cardType: '',
			cvvLength: 3,
			yearForceRender: false,
		};
	}
	/* eslint-enable react/sort-comp */

	setData = (path: Array<string>, value: any) => {
		this.props.setData(['payment', ...path], value);
	}

	toggleFaqContent = () => {
		if (this.state.showFaqContent) {
			this.setState({
				showFaqContent: false,
			});
		} else {
			this.setState({
				showFaqContent: true,
			});
		}
	}

	hideFaqContent = () => {
		this.setState({
			showFaqContent: false,
		});
	}

	cardValidation = (form: Object, field: string): boolean | string => {
		if (!field) {
			return 'This field is required';
		}
		const res = cardValidator.number(field);

		if (!res.isPotentiallyValid || !res.isValid) {
			return 'Invalid card number';
		}

		return true;
	}

	cardChange = (e: {target: {value: string }}): void => {
		if (!e.target.value) {
			this.setState({
				cardType: '',
			});
			return;
		}
		const res = cardValidator.number(e.target.value);
		if (!res || !res.isPotentiallyValid || !res.isValid) {
			this.setState({
				cardType: '',
			});
			return;
		}
		this.setState({
			cardType: res.card.type,
			cvvLength: res.card.code.size,
		});
	}

	saveData = (currentValues: {
		creditCardNumber: ?string;
		securityCode: ?string;
		expMonth: ?string;
		expYear: ?string;
	}) => {
		if (currentValues.creditCardNumber && currentValues.securityCode) {
			this.setData(['creditCardNumber'], currentValues.creditCardNumber);
			this.setData(['securityCode'], currentValues.securityCode);
		}
		if (currentValues.expMonth && currentValues.expYear) {
			this.setData(['expMonth'], currentValues.expMonth);
			this.setData(['expYear'], currentValues.expYear);
		}
	}

	cvvValid = (form: Object, field: string): boolean | string => {
		if (!field) {
			return 'This field is required';
		}
		if (field === '111') {
			return 'любой';
		}
		const res = cardValidator.cvv(field, this.state.cvvLength);

		if (!res.isPotentiallyValid || !res.isValid) {
			return this.state.cvvLength === 3 ? 'Invalid CVV number' : 'Invalid CID number';
		}

		return true;
	}

	expMonthChange = (field: string): void => {
		this.expMonthState = field;
		this.setState({
			yearForceRender: !this.state.yearForceRender,
		});
		this.saveData({
			creditCardNumber: null,
			securityCode: null,
			expMonth: this.expMonthState,
			expYear: this.expYearState,
		});
	}

	expYearChange = (field: string): void => {
		this.expYearState = field;
		this.saveData({
			creditCardNumber: null,
			securityCode: null,
			expMonth: this.expMonthState,
			expYear: this.expYearState,
		});
	}

	expValidate = (): string | boolean => {
		if (this.expYearState !== '' && this.expMonthState !== '') {
			const res = cardValidator.expirationDate(`${this.expMonthState} ${this.expYearState}`);
			if (!res.isValid || !res.isPotentiallyValid) {
				return 'Invalid expiration date';
			}
			return false;
		}
		return 'This field is required';
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
						<div styleName="cards">
							<img
								src={visa}
								alt="visa"
								className={`${this.state.cardType === 'visa' ? styles.active : ''}`}
								/>
							<img
								src={mastercard}
								alt="mastercard"
								className={`${this.state.cardType === 'master-card' ? styles.active : ''}`}
								/>
							<img
								src={maestro}
								alt="maestro"
								className={`${this.state.cardType === 'maestro' ? styles.active : ''}`}
								/>
							<img
								src={discover}
								alt="discover"
								className={`${this.state.cardType === 'discover' ? styles.active : ''}`}
								/>
							<img
								src={americanExpress}
								alt="american express"
								className={`${this.state.cardType === 'american-express' ? styles.active : ''}`}
								/>
						</div>
					</div>
					<Form name="payment">
						<div styleName="second-form-wrapper">
							<div styleName="credit-card-number">
								<Input
									name="creditCardNumber"
									floatingLabelText="Credit card number"
									className={styles.numberInput}
									onChange={this.cardChange}
									validations={{
										cardValid: this.cardValidation,
									}}
									white
									required
									/>
								<div styleName="lock"></div>
							</div>
							<Input
								styleName="security-code"
								name="securityCode"
								floatingLabelText="Security code"
								validations={{
									cvvValid: this.cvvValid,
								}}
								white
								required
								/>
							<div styleName={this.state.showFaqContent ? 'faq show-content' : 'faq'}>
								<span styleName="faq-span" onClick={this.toggleFaqContent}></span>
								<FaqContent
									className={styles['faq-content']}
									hide={this.hideFaqContent}
									/>
							</div>
						</div>
						<div styleName="expiration-wrapper">
							<AutoInput
								name="expMonth"
								styleName="expMonth"
								dataSource={months}
								filter={() => true}
								onUpdateInput={this.expMonthChange}
								onNewRequest={this.expMonthChange}
								anchorOrigin={{ horizontal: 'left', vertical: 'top'}}
								targetOrigin={{ horizontal: 'left', vertical: 'bottom'}}
								popoverProps={{ style: { height: 200, overflow: 'auto' } }}
								maxSearchResults={12}
								arrow="gray"
								white
								required
								/>
							<AutoInput
								name="expYear"
								styleName="expYear"
								dataSource={years}
								filter={() => true}
								onUpdateInput={this.expYearChange}
								onNewRequest={this.expYearChange}
								validations={{ expValidate: this.expValidate }}
								anchorOrigin={{ horizontal: 'left', vertical: 'top'}}
								targetOrigin={{ horizontal: 'left', vertical: 'bottom'}}
								popoverProps={{ style: { height: 200, overflow: 'auto' } }}
								maxSearchResults={19}
								forceRender={this.state.yearForceRender}
								arrow="gray"
								white
								required
								/>
							<div styleName="expText">Exp.</div>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}
