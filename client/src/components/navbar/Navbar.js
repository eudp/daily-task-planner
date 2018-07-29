import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';
import DatePickerContainer from '../../containers/DatePickerContainer';
import SearchTypeContainer from '../../containers/SearchTypeContainer';

const styles = {
	root: {
		flexGrow: 1,
		marginBottom:'10px'
	},
	flex: {
		flex: 1
	},
	titleLink: {
		color: 'white',
		textDecoration: 'none'
	}
};

const Navbar = ({ user, classes, handleLogIn, handleLogOut }) => (
	<div className={classes.root}>
		<AppBar position="static">
			<Toolbar>
					
						<Typography variant="title" color="inherit" className={classes.flex}>
							<Link to="/" className={classes.titleLink}>
								<Hidden xsDown>
									Daily Task Planner {user ? `| ${user.userName}` : ``}
								</Hidden>
								<Hidden smUp>
									DTP
								</Hidden>
							</Link>
						</Typography>
				{user ?
					<Fragment>
						<DatePickerContainer />
						<SearchTypeContainer />
						<LoginMenu onLogOut={handleLogOut} />
					</Fragment>
					: <LoginButton onClick={handleLogIn} />}
			</Toolbar>
		</AppBar>
	</div>
)

Navbar.propTypes = {
	user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired
};

export default withStyles(styles)(Navbar);