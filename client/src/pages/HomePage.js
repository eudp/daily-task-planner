import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withUser } from '../services/withUser';

import DaysListContainer from '../containers/DaysListContainer';

const styles = {
	widthMainItem: {
		maxWidth: '95%'
	}
};

const HomePage = props => {

	const { user, classes } = props;
	
	return(

		<Grid container justify="center">
			{user &&

				<Grid item xs={12} className={classes.widthMainItem}>
					<DaysListContainer />
				</Grid>

			}
			{!user &&

				<Grid item xs={12}>
					<Typography variant="headline" align="center">
						Hey! I don't recognize you! Log in using the link above
					</Typography>
				</Grid>
				
			}
		</Grid>

	);
	
}

HomePage.propTypes = {
	user: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withUser(HomePage));