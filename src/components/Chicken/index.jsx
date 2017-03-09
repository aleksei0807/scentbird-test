/* @flow */
import React from 'react';
import logo from './chicken.svg';

const Chicken = (props: Object) => (
	<img
		src={logo}
		style={{width: props.width || 368}}
		alt="SCENTBIRD"
		/>
);

export default Chicken;
