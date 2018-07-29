import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import TodoListContainer from '../containers/TodoListContainer';


const TodoDay = ({ todoDay, cleaningTimezone }) => (

	<Grid item xs={12} md={3} key={todoDay._id}>

		<Paper>

			<Typography variant="headline" component="h3" align="center" gutterBottom>
				{format(cleaningTimezone(todoDay._id), 'MMMM D, YYYY')}
			</Typography>

			<TodoListContainer tasks={todoDay.tasks} date={format(cleaningTimezone(todoDay._id), 'YYYY-MM-DD')}/>

		</Paper>

	</Grid>

)
	


TodoDay.propTypes = {
	cleaningTimezone: PropTypes.func.isRequired,
	todoDay: PropTypes.object.isRequired
};

export default TodoDay;