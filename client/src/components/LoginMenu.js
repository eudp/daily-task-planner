import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class LoginMenu extends Component {
	state = {
		anchorEl: null,
	}

	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget
		});
	}

	handleClose = () => {
		this.setState({
			anchorEl: null
		});
	}

	render() {

		const {onLogOut, userName, ...otherProps} = this.props;
		const { anchorEl } = this.state;

		return (
			<Fragment>
				<IconButton
					aria-label="More"
					aria-owns={anchorEl ? 'long-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>

				<Menu 
					{...otherProps} 
					id="long-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					anchorOrigin={{
	          vertical: 'top',
	          horizontal: 'right',
	        }}
	        transformOrigin={{
	          vertical: 'top',
	          horizontal: 'right',
	        }}
				>
					<MenuItem>
						{userName}
					</MenuItem>
					<MenuItem onClick={onLogOut} >
						Log out
					</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

export default LoginMenu;