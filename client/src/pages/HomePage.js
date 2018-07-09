import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withUser } from '../services/withUser';

import TodoList from '../components/TodoList';

class HomePage extends Component {
	
	render() {

		const { user } =  this.props;
		
		return(

			<Grid container>
				{user &&

					<Grid item xs={12}>
						<TodoList/>
					</Grid>

				}
				{!user &&
					<Grid item xs={12}>
						<Typography component="p">
							Hey! I don't recognize you! Register and log in using the link above
						</Typography>
					</Grid>
				}
			</Grid>
	
		);
	}
}

export default withUser(HomePage);