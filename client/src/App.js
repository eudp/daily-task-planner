import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';

import { withUser, update } from './services/withUser';

import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component {
	
	async componentDidMount() {

		try {

			// this is going to double check that the user is still actually logged in
			const res = await axios.get('/api/auth');

      /**
			* if we get here, the user's session is still good. we'll update the user 
			* to make sure we're using the most recent values just in case
			*/
			update(res.data);

		} catch (err) {
			if (err.response.status === 401) {
				update(null);
			}
		}

	}

	render() {
		const { user } = this.props;
		return (
			<Router>
					<Fragment>
						<Navbar
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
		);
	}
}

export default withUser(App);