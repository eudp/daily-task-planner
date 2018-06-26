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
	componentDidMount() {
		axios.get('/api/auth')
			.then(res => {
				update(res.data);
			})
			.catch(err => {
				if (err.response.status === 401) {
					update(null);
				}
			});
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

export default App;