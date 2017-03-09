/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { setData } from '../../actions/data';
import Tick from '../../components/Tick';
import { roseColor } from '../../styles/vars';
import menNotpicked from './images/men-notpicked.svg';
import menPicked from './images/men-picked.svg';
import womanNotpicked from './images/woman-notpicked.svg';
import womanPicked from './images/woman-picked.svg';
import styles from './index.css';

const mapStateToProps = state => ({
	subscription: state.data.get('subscription'),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles, { allowMultiple: true })
export default class Subscription extends Component {
	static propTypes = {
		subscription: PropTypes.string,
	};

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

	setData = (value: string) => () => {
		this.props.setData(['subscription'], value);
	}

	toggleTick = () => {
		this.setState({
			tickEnable: !this.state.tickEnable,
		});
	}

	render() {
		const { subscription, onlySmallScreen } = this.props;

		return (
			<div styleName={`container${onlySmallScreen ? ' onlySmallScreen' : ''}`}>
				<h2 styleName="title">Choose your subscription type</h2>
				<div styleName="wrapper left">
					<div styleName="img-wrapper" onClick={this.setData('woman')}>
						<img
							src={subscription && subscription !== 'woman' ? womanNotpicked : womanPicked}
							alt="woman"
							/>
						{!subscription || subscription === 'woman'
							? (
								<div styleName="tick-container" onClick={this.toggleTick}>
									<div
										styleName="tick"
										style={{
											display: this.state.tickEnable ? 'block' : 'none',
										}}>
										<Tick color={roseColor} />
									</div>
								</div>
							) : null}
					</div>
					<h4>For women</h4>
				</div>
				<div styleName="wrapper right">
					<div styleName="img-wrapper" onClick={this.setData('men')}>
						<img
							src={subscription && subscription === 'men' ? menPicked : menNotpicked}
							alt="men"
							/>
						{subscription && subscription === 'men'
							? (
								<div styleName="tick-container" onClick={this.toggleTick}>
									<div
										styleName="tick"
										style={{
											display: this.state.tickEnable ? 'block' : 'none',
										}}>
										<Tick color={roseColor} />
									</div>
								</div>
							) : null}
					</div>
					<h4>For men</h4>
				</div>
			</div>
		);
	}
}
