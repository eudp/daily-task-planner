import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import TodoItem from './TodoItem';

const TodoTasks = (props) => (

	<div>

		{props.tasks.length ? (

				<List>
					{props.tasks.map((currentValue, index) =>
						<TodoItem key={index} task={currentValue} />
					)}
				</List>
			
		) : (
			<Typography component="p" align="center" gutterBottom>
				Without tasks yet.
			</Typography>
		)}

	</div>

);

export default TodoTasks;