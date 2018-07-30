import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

class LoginMenu extends Component {

	state = {
		// The DOM element used to set the position of the menu
		anchorEl: null,
	};

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

		const { onLogOut } = this.props;
		const { anchorEl } = this.state;

		return (
			<Fragment>		
				<IconButton
					aria-label="More"
					aria-owns={Boolean(anchorEl) ? 'long-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<AccountCircle />
				</IconButton>

				<Menu 
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
					<MenuItem onClick={onLogOut} >
						Log out
					</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

LoginMenu.propTypes = {
  onLogOut: PropTypes.func.isRequired
};

export default LoginMenu;