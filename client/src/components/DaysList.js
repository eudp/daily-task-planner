import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TodoDay from './TodoDay';

const DaysList = ({ tasks, cleaningTimezone }) => { 

	return(
		<Grid container spacing={24} alignItems="center">
			{!tasks &&
				<Grid item xs={12} >
					<Typography component="p">
						Hold, on looking for your tasks...
					</Typography>
				</Grid>
			}
			{tasks &&
				<Fragment>
					{tasks.map((todoDay) => 
						<TodoDay key={todoDay._id} todoDay={todoDay} cleaningTimezone={cleaningTimezone} />
					)}
				</Fragment>
			}
		</Grid>
	);

}


export default DaysList;