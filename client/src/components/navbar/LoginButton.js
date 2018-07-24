import React from 'react';
import Button from '@material-ui/core/Button';

const LoginButton = ({ onClick }) => (
	<Button color="inherit" onClick={onClick}>
		Login
	</Button>
);

export default LoginButton;