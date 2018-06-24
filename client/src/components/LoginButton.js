import React from 'react';
import Button from '@material-ui/core/Button';

const LoginButton = (props) => (
	<Button variant="contained" color="primary" onClick={props.onClick}>
		Log in
	</Button>
);

export default LoginButton;