import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { update, withUser } from '../services/withUser';
import { AuthApi } from '../api/userApi';

const styles = {
  button: {
    margin: '25px 0px',
  },
};

class LoginPage extends Component {

	state = {
		email: null,
		password: null
	};

	handleInputChanged = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleLogin = async event => {
		event.preventDefault();

		const { email, password } = this.state;
		const { history } = this.props;

		try {

			const user = await AuthApi.createSession({
										email, 
										password
									});

			update(user.data);
			history.push('/');

		} catch (err) {
			this.setState({
				error: err.response.status === 401 ? 'Invalid email or password.' : err.message
			});
		}
	}

	render() {
		const { classes, user } = this.props;
		const { error } = this.state;

		if (user) return <Redirect to="/" />;

		return (

			<Grid container justify="center">
				<Grid item md={2} sm={4} xs={8}>

					<form onSubmit={this.handleLogin}>

						<Grid container>
							<Grid item xs={12}>
								<Typography variant="title" align="center">
									Log In to Your Account
								</Typography>
								{error &&
									<Typography paragraph color="error" align="center">
										{error}
									</Typography>
								}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="email"
									label="Email"
									name="email"
									type="email"
									margin="dense"
									onChange={this.handleInputChanged}
									fullWidth	
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="password"
									label="Password"
									name="password"
									type="password"
									margin="dense"
									onChange={this.handleInputChanged}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Button variant="raised" color="primary" type="submit" fullWidth className={classes.button}>
								Let's go!
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Typography paragraph align="center">
									or <Link to="/create">Register</Link>
							</Typography>
						</Grid>

					</form>
					
				</Grid>
			</Grid>
		);
	}
}

LoginPage.propTypes = {
	user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(withUser(LoginPage));