import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { update } from '../services/withUser';

import Navbar from '../components/navbar/Navbar';

const NavbarContainer = ({ user, history }) => {
	
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
		<Navbar user={user} handleLogOut={handleLogOut} handleLogIn={handleLogIn} />
	);
};

export default withRouter(NavbarContainer);