import axios from 'axios';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { update } from '../services/withUser';

class LoginPage extends Component {
	state = {
		email: null,
		password: null
	}

	handleInputChanged = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleLogin = (event) => {
		event.preventDefault();

		const { email, password } = this.state;
		const { history } = this.props;

		axios.post('/api/auth', {
			email, 
			password
		})
			.then(user => {
				update(user.data);
				history.push('/');
			})
			.catch(err => {
				this.setState({
					error: err.response.status === 401 ? 'Invalid email or password.' : err.message
				});
			});
	}

	render() {
		const { error } = this.state;

		return (
			<Grid fluid>
				<Row>
					<Col xs={6} xsOffset={3}>
						<form onSubmit={this.handleLogin}>
							<h1>Log In</h1>
							{error &&
								<div>
									{error}
								</div>
							}
							<div>
								<TextField
									required
									id="email"
									label="Email"
									name="email"
									onChange={this.handleInputChanged}
								/>
							</div>
							<div>
								<TextField
									required
									id="password"
									label="Password"
									name="password"
									type="password"
									onChange={this.handleInputChanged}
								/>
							</div>
							<div>
								<Button variant="raised" color="primary" type="submit">
									Log In
								</Button>
							</div>
							<p>
								or
							</p>
							<p>
								<Link to="/create">
									Register
								</Link>
							</p>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default LoginPage;