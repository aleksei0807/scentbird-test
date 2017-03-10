/* @flow */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';

@CSSModules(styles, { allowMultiple: true })
export default class Triangle extends Component {
	render() {
		return (
			<div styleName="container">
				<div styleName="triangle">
					<div styleName="shadow" />
				</div>
			</div>
		);
	}
}
