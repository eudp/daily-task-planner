import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const LoginButton = ({ onClick }) => (
	<Button onClick={onClick}>
		Login
	</Button>
)

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default LoginButton;