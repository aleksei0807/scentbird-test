/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Form } from 'formsy';
import { setData } from '../../actions/data';
import Input from '../../components/Input';
import FaqContent from '../../components/FaqContent';
import safe from './images/safe.svg';
import cards from './images/cards.png';
import styles from './index.css';

const mapStateToProps = state => ({
	paymentData: state.data.get('payment'),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles, { errorWhenNotFound: false, allowMultiple: true })
export default class Payment extends Component {
	static propTypes = {
		paymentData: PropTypes.object,
	};

	/* eslint-disable react/sort-comp */
	state: {
		showFaqContent: boolean;
	};

	constructor(...args: Array<*>) {
		super(...args);

		this.state = {
			showFaqContent: false,
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
							<div styleName={this.state.showFaqContent ? 'faq show-content' : 'faq'}>
								<span styleName="faq-span" onClick={this.toggleFaqContent}></span>
								<FaqContent
									className={styles['faq-content']}
									hide={this.hideFaqContent}
									/>
							</div>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}
