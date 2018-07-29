import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { withUser, update } from './services/withUser';
import { AuthApi } from './api/userApi';

import NavbarContainer from './containers/NavbarContainer';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

import { green, pink } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: pink,
  },
  overrides: {
    MuiButton: { 
      root: { 
        color: 'white', 
      },
      raisedPrimary: {
      	color: 'white'
      }
    },
  },
});


class App extends Component {
	
	async componentDidMount() {

		try {

			// this is going to double check that the user is still actually logged in
			const res = await AuthApi.getSession('/api/auth');

      /**
			* if we get here, the user's session is still good. we'll update the user 
			* to make sure we're using the most recent values just in case
			*/
			update(res.data);

		} catch (err) {
			if (err.response.status === 401) update(null);
		}

	}

	render() {
		
		const { user, store } = this.props;

		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
							<Fragment>
								<NavbarContainer
									user={user}
								/>
								<Switch>
									<Route exact path="/" component={HomePage} />
									<Route exact path="/login" component={LoginPage} />
									<Route exact path="/create" component={CreateAccountPage} />
									<Route component={NotFoundPage} />
								</Switch>
							</Fragment>
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	user: PropTypes.object,
  store: PropTypes.object.isRequired
};

export default withUser(App);