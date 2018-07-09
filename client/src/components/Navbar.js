import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { update } from '../services/withUser';

import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';

const styles = {
	root: {
		flexGrow: 1,
		marginBottom:'10px'
	},
	flex: {
		flex: 1
	}
};

const Navbar = (props) => {
	const { user, classes } = props;
	const userName = user ? user.userName : null;

	const handleLogIn = () => {
		props.history.push('/login');
	};

	const handleLogOut = () => {
		axios.delete('/api/auth')
			.then(() => {
				update(null);
			})
			.catch((err) => {
				console.log(err);
			}
		);
	}

	return (

		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.flex}>
						Daily Task Planner {user ? `| ${user.userName}` : ``}
					</Typography>
					{user ?
						<LoginMenu onLogOut={handleLogOut} />
						: <LoginButton onClick={handleLogIn} />}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(withStyles(styles)(Navbar));