import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withUser } from '../services/withUser';

import DaysList from '../components/todo/DaysList';

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
					<DaysList/>
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

export default withStyles(styles)(withUser(HomePage));