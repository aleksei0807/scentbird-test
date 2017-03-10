/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Triangle from '../../components/Triangle';
import close from './images/close.svg';
import visaMastercard from './images/visa-mastercard.png';
import americanExpress from './images/american-express.png';
import visaMastercardFull from './images/visa-mastercard-full.png';
import americanExpressFull from './images/american-express-full.png';
import styles from './index.css';

@CSSModules(styles, { allowMultiple: true })
export default class FaqContent extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		hide: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className={this.props.className}>
				<img src={close} alt="close" styleName="close" onClick={this.props.hide} />
				<h2 styleName="title">What is a card security code?</h2>
				<p styleName="subtitle">A three- or four-digit code on your credit card.
The location varies slightly depending on your type of card</p>
				<div styleName="content">
					<div styleName="left">
						<img src={visaMastercard} styleName="card-prev" alt="visa mastercard" />
						<span styleName="card-name">VISA, MasterCard</span>
						<img src={visaMastercardFull} styleName="card-full" alt="visa mastercard" />
						<span styleName="bottom-text">Back of card</span>
					</div>
					<div styleName="line" />
					<div styleName="right">
						<img src={americanExpress} styleName="card-prev" alt="american express" />
						<span styleName="card-name">American Express</span>
						<img src={americanExpressFull} styleName="card-full" alt="american express" />
						<span styleName="bottom-text">Front of card</span>
					</div>
				</div>
				<Triangle />
			</div>
		);
	}
}
