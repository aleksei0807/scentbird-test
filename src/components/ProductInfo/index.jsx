/* @flow */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Tick from '../Tick';
import { roseColor } from '../../styles/vars';
import styles from './index.css';
import preview from './images/free-perfume-product.png';

@CSSModules(styles, { allowMultiple: true })
export default class ProductInfo extends Component {
	/* eslint-disable react/sort-comp */
	state: {
		tickEnable: boolean;
	};

	constructor(...args: Array<any>) {
		super(...args);
		this.state = {
			tickEnable: true,
		};
	}
	/* eslint-enable react/sort-comp */

	toggleTick = () => {
		this.setState({
			tickEnable: !this.state.tickEnable,
		});
	}

	render() {
		return (
			<div styleName="container">
				<div styleName="preview-wrapper">
					<img src={preview} alt="free-perfume-product" />
				</div>
				<div styleName="info-wrapper">
					<div styleName="info">
						<div styleName="info-line">
							<span>Monthly subscription</span>
							<span>$14.95</span>
						</div>
						<div styleName="info-line">
							<span>Shipping</span>
							<span>FREE</span>
						</div>
						<div styleName="info-line">
							<span>Tax</span>
							<span>$2.35</span>
						</div>
						<div styleName="info-line">
							<span>Discount</span>
							<span className="crose">-$5</span>
						</div>
						<div styleName="info-line">
							<span>Credit (Balance $100)</span>
							<div>
								<span>$50</span>
								<div styleName="tick-container" onClick={this.toggleTick}>
									<div
										styleName="tick"
										style={{
											display: this.state.tickEnable ? 'block' : 'none',
										}}>
										<Tick color={roseColor} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div styleName="info-line">
						<span styleName="total">TOTAL</span>
						<span styleName="total">$25.00</span>
					</div>
					<div styleName="have-a-coupon">
						Have a <a href="#">coupon code</a>?
					</div>
				</div>
			</div>
		);
	}
}
