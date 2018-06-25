import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';

import { update } from '../services/withUser';

const Navbar = (props) => {
	const { user } = props;
	const username = user ? user.username : null;

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
		<AppBar position="static">
			<Toolbar>
				<Typography variant="title" color="inherit">
					PassportJS Example
				</Typography>
				{user ?
					<LoginMenu username={username} onLogOut={handleLogOut} />
					: <LoginButton onClick={handleLogIn} />}
			</Toolbar>
		</AppBar>
	);
};

export default withRouter(Navbar);