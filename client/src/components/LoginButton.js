import React from 'react';
import Button from '@material-ui/core/Button';

const LoginButton = props => (
	<Button color="inherit" onClick={props.onClick}>
		Login
	</Button>
);

export default LoginButton;