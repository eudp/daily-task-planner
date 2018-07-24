import React from 'react';
import format from 'date-fns/format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import TodoList from './TodoList';


const TodoDay = ({ todoDay, cleaningTimezone }) => {
	
	return(

		<Grid item xs={12} md={3} key={todoDay._id}>

			<Paper>

				<Typography variant="headline" component="h3" align="center" gutterBottom>
					{format(cleaningTimezone(todoDay._id), 'MMMM D, YYYY')}
				</Typography>

				<TodoList tasks={todoDay.tasks} date={format(cleaningTimezone(todoDay._id), 'YYYY-MM-DD')}/>

			</Paper>

		</Grid>

	);
	
}

export default TodoDay;