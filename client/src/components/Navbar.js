import axios from 'axios';
import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { update } from '../services/withUser';

import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';
import DatePicker from './login-options/DatePicker';
import MenuOptions from './login-options/TypeSearch';

const styles = {
	root: {
		flexGrow: 1,
		marginBottom:'10px'
	},
	flex: {
		flex: 1
	},
	titleLink: {
		color: 'white',
		textDecoration: 'none'
	}
};

const Navbar = props => {
	const { user, classes, history } = props;

	const handleLogIn = () => {
		history.push('/login');
	};

	const handleLogOut = async () => {

		try {

			await axios.delete('/api/auth');
			update(null);

		} catch (err) {
			console.log(err);
		}

	};

	return (

		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							<Link to="/" className={classes.titleLink}>
								Daily Task Planner {user ? `| ${user.userName}` : ``}
							</Link>
						</Typography>
					{user ?
						<Fragment>
							<DatePicker />
							<MenuOptions />
							<LoginMenu onLogOut={handleLogOut} />
						</Fragment>
						: <LoginButton onClick={handleLogIn} />}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(withStyles(styles)(Navbar));