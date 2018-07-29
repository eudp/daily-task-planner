import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TodoDay from './TodoDay';

const DaysList = ({ tasks, cleaningTimezone }) => (
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
)

DaysList.propTypes = {
	cleaningTimezone: PropTypes.func.isRequired,
	tasks: PropTypes.array.isRequired
};

export default DaysList;