import React from 'react';
import FlatButton from '@material-ui/core/FlatButton';

const LoginButton = (props) => (
	<FlatButton label="Log in" onClick={props.onClick} />
);

export default LoginButton;