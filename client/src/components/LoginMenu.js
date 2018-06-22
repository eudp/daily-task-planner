import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/core/IconMenu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/core/svg-icons/navigation/more-vert';

const LoginMenu = (props) => {
	const {onLogout, username, ...otherProps} = props;

	return (
		<IconMenu
			{...otherProps}
			iconButtonElement={
				<IconButton><MoreVertIcon /></IconButton>
			}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		>
			<MenuItem primaryText={username} />
			<MenuItem primaryText="Log out" onClick={onLogout} />
		</IconMenu>
	);
};

export default LoginMenu;