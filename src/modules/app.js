import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@zendeskgarden/react-theming';
import {GlobalContextProvider} from '../context/Global';
import {DEFAULT_LOCALE} from '../lib/constants';
import ErrorBoundary from './ErrorBoundary';
import Main from './Main';
import {Theme} from './Theme';

class App {
	constructor(client, appData) {
		this._client = client;
		this._appData = appData;

		this.states = {};

		// this.initializePromise is only used in testing
		// indicates app initilization(including all async operations) is complete
		this.initializePromise = this._initUserSidebar();
	}


	async _initUserSidebar() {
		let currentUserId = null;
		let currentUserName = null;

		try {
			const [user] = await Promise.all([
				this._client.get('currentUser')
			]);

			currentUserId = user.currentUser.id;
			currentUserName = user.currentUser.name;
		} catch (e) {
			this._handleError.call(this, e);
		}

		this.states.userId = currentUserId;
		this.states.userName = currentUserName;

		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContextProvider
						value={{UserSidebar: this._client}}
					>
						<ThemeProvider theme={Theme}>
							<Main data={this.states} />
						</ThemeProvider>
					</GlobalContextProvider>
				</ErrorBoundary>
			</StrictMode>,
			document.querySelector('.main')
		);
	}


	/**
	 * Handles error
	 * @param {Object} error error object
	 */
	_handleError(error) {
		console.error(
			`Retriving data returned with the following error: `,
			error.status,
			error.statusText
		);
	}


	_renderUserSideBar() {
		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContextProvider
						value={{UserSidebar: this._client}}
					>
						<ThemeProvider theme={Theme}>
							<Main data={this.states} />
						</ThemeProvider>
					</GlobalContextProvider>
				</ErrorBoundary>
			</StrictMode>,
			document.querySelector('.main')
		);
	}
}

export default App;
