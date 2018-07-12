import axios from 'axios';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    margin: '25px 0px',
  },
};

class CreateAccountPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			userName: null,
			email: null,
			password: null,
			confirmationPassword: null,
			error: null
		};
	}

	handleInputChanged = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleRegister = (event) => {
		event.preventDefault();

		const { userName, email, password, confirmationPassword } = this.state;
		const { history } = this.props;

		this.setState({
			error: null
		});

		if(!userName || !password || !email) {
			this.setState({
				error: 'All the fields are required'
			});
			return;
		}

		axios.post('api/users', {
			userName,
			email,
			password,
			confirmationPassword
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

		const { classes } = this.props;
		const { error } = this.state;

		return (

			<Grid container justify="center">
				<Grid item md={2} sm={4} xs={8}>

					<form onSubmit={this.handleRegister}>

						<Grid container>
							<Grid item xs={12}>
								<Typography variant="title" color="inherit" align="center">
									Create Account
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
									id="userName"
									label="Username"
									name="userName"
									type="text"
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
							<Grid item xs={12}>
								<TextField
									required
									id="confirmationPassword"
									label="Confirmation password"
									name="confirmationPassword"
									type="password"
									margin="dense"
									onChange={this.handleInputChanged}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Button variant="raised" color="primary" type="submit" fullWidth className={classes.button}>
								Create Account
							</Button>
						</Grid>

					</form>
					
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(CreateAccountPage);