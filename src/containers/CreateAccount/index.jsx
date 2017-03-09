/* @flow */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Form } from 'formsy';
import Input from '../../components/Input';
import { setData } from '../../actions/data';
import emailRegex from '../../utils/emailRegex';
import styles from './index.css';

const mapStateToProps = state => ({
	accountData: state.data.get('account'),
});

@connect(mapStateToProps, { setData })
@CSSModules(styles)
export default class CreateAccount extends Component {
	static propTypes = {
		accountData: PropTypes.object,
	};

	/* eslint-disable react/sort-comp */
	state: {
		emailRequired: boolean;
		passwordRequired: boolean;
	};

	constructor(...args: Array<*>) {
		super(...args);
		this.state = {
			emailRequired: false,
			passwordRequired: false,
		};
	}
	/* eslint-enable react/sort-comp */

	setData = (path: Array<string>, value: any) => {
		this.props.setData(['account', ...path], value);
	}

	inputRequired = (name: string) => () => {
		if (!this.state[name]) {
			this.setState({
				[name]: true,
			});
		}
	}

	render() {
		return (
			<div styleName="container">
				<h2 styleName="title">Create account</h2>
				<Form name="account" className={styles.form}>
					<Input
						className={`${styles.input} ${styles.left}`}
						name="email"
						floatingLabelText="Email address"
						onFocus={this.inputRequired('emailRequired')}
						required={this.state.emailRequired}
						validationError="This is not an email"
						validations={{
							matchRegexp: emailRegex,
						}}
						/>
					<Input
						className={`${styles.input} ${styles.right}`}
						name="password"
						floatingLabelText="Password"
						onFocus={this.inputRequired('passwordRequired')}
						validationError="Password should be at least 10 characters long"
						required={this.state.passwordRequired}
						validations="isLength:10"
						/>
				</Form>
			</div>
		);
	}
}
