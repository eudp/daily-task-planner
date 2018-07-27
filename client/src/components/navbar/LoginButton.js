import React from 'react';
import Button from '@material-ui/core/Button';

const LoginButton = ({ onClick }) => (
	<Button onClick={onClick}>
		Login
	</Button>
);

export default LoginButton;