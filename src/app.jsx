/* @flow */
import React, { Component } from 'react';
import type { Element } from 'react'; // eslint-disable-line no-duplicate-imports
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GeneralContainer from './containers/General';
import './styles/index.css';

export default class App extends Component {
	render(): Element<{}> {
		const { store } = this.props;
		return (
			<MuiThemeProvider>
				<Provider store={store}>
					<GeneralContainer />
				</Provider>
			</MuiThemeProvider>
		);
	}
}
