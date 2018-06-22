import axios from 'axios';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CreateAccountPage extends Component {
	state = {
		username: null,
		password: null,
		error: null
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

		this.setState({
			error: null
		});

		if(!username || !password) {
			this.setState({
				error: 'A username and password is required'
			});
			return;
		}

		axios.post('api/users', {
			username,
			password
		})
			.then(user => {
				history.push('/login');
			})
			.catch(err => {
				this.setState({
					error: err.response.data.message || err.message
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
							<h1>Create Account</h1>
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
									Create Account
								</RaisedButton>
							</div>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default CreateAccountPage;