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

	setData = (currentValues: { email: string; password: string; }) => {
		const { email, password } = currentValues;
		let prevEmail = '';
		let prevPassword = '';
		if (this.props.accountData) {
			prevEmail = this.props.accountData.get('email');
			prevPassword = this.props.accountData.get('password');
		}
		if (email && email !== prevEmail) {
			this.props.setData(['account', 'email'], email);
		}
		if (password && password !== prevPassword) {
			this.props.setData(['account', 'password'], password);
		}
	}

	render() {
		return (
			<div styleName="container">
				<h2 styleName="title">Create account</h2>
				<Form name="account" className={styles.form} onChange={this.setData}>
					<Input
						className={`${styles.input} ${styles.left}`}
						name="email"
						floatingLabelText="Email address"
						required
						validationError="This is not an email"
						validations={{
							matchRegexp: emailRegex,
						}}
						/>
					<Input
						className={`${styles.input} ${styles.right}`}
						name="password"
						floatingLabelText="Password"
						validationError="Password should be at least 10 characters long"
						required
						type="password"
						validations={{
							matchRegexp: /.{10,}/,
						}}
						/>
				</Form>
			</div>
		);
	}
}
