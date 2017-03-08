/* @flow */
import React from 'react';
import logo from './logo.svg';

const Logo = (props: Object) => (
	<img
		src={logo}
		style={{height: props.height || 39}}
		alt="SCENTBIRD"
		/>
);

export default Logo;
