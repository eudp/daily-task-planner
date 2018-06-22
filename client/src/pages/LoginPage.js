import axios from 'axios';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { update } from '../services/withUser';

class LoginPage extends Component {
	state = {
		username: null,
		password: null
	}

	handleInputChanged = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleLogin = (event) => {
		event.preventDefault();

		const { username, password } = this.state;
		const { history } = this.props;

		axios.post('/api/auth', {
			username, 
			password
		})
			.then(user => {
				update(user.data);
				history.push('/');
			})
			.catch(err => {
				this.setState({
					error: err.response.status === 401 ? 'Invalid username or password.' : err.message
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
									name="username"
									hintText="Username"
									floatingLabelText="Username"
									onChange={this.handleInputChanged}
								/>
							</div>
							<div>
								<TextField
									name="password"
									hintText="Password"
									floatingLabelText="Password"
									type="password"
									onChange={this.handleInputChanged}
								/>
							</div>
							<div>
								<RaisedButton primary type="submit">
									Log In
								</RaisedButton>
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