import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import TodoItem from './TodoItem';
import TodoAdd from './TodoAdd';


const TodoList = ({ tasks, handleDelete, handleUpdate, handleAdd }) => (
	<Fragment>

		{tasks.length ? (

			<List>
				{tasks.map((task) =>
					<TodoItem handleDelete={handleDelete} handleUpdate={handleUpdate} key={task._id} task={task}/>
				)}
			</List>

		) : (
			<Typography component="p" align="center" gutterBottom>
				Without tasks yet.
			</Typography>
		)}

		<Divider/>

		<TodoAdd handleAdd={handleAdd}/>

	</Fragment>
)

TodoList.propTypes = {
	tasks: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleUpdate: PropTypes.func.isRequired,
	handleAdd: PropTypes.func.isRequired
};

export default TodoList;