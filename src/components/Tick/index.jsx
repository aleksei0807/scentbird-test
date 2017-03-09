/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';

@CSSModules(styles, { allowMultiple: true })
export default class Tick extends Component {
	static propTypes = {
		color: PropTypes.string.isRequired,
	};

	render() {
		const tickClassName = `${styles.tick}${this.props.className ? ` ${this.props.className}` : ''}`;
		return (
			<div className={tickClassName}>
				<div styleName="left" style={{background: this.props.color}} />
				<div styleName="right" style={{background: this.props.color}} />
			</div>
		);
	}
}
