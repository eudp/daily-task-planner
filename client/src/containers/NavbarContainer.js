import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { update } from '../services/withUser';
import { AuthApi } from '../api/userApi';

import Navbar from '../components/navbar/Navbar';

const NavbarContainer = ({ user, history }) => {
	
	const handleLogIn = () => {
		history.push('/login');
	}

	const handleLogOut = async () => {

		try {

			await AuthApi.removeSession('/api/auth');
			update(null);

		} catch (err) {
			console.log(err);
		}

	}

	return (
		<Navbar user={user} handleLogOut={handleLogOut} handleLogIn={handleLogIn} />
	);
}

NavbarContainer.propTypes = {
	user: PropTypes.object,
  history: PropTypes.object.isRequired
};

export default withRouter(NavbarContainer);