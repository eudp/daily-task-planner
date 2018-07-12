import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

import TodoEdit from './TodoEdit';

const styles = theme => ({
	editIcon: {
		marginRight: 0
	}
});

const TodoItem = (props) => (

	<ListItem 
		role={undefined} 
		dense 
		disableGutters
	>
		<Checkbox
			checked={props.task.done}
			tabIndex={-1}
			onClick={() => {/*actions.completeTodo(task._id, !task.done); */}}
		/>

		<ListItemText primary={`Terminar proyecto de nodeJS.com`/*props.task.text*/} />

		<ListItemIcon>
			<IconButton 
      	aria-label="Edit"
      	onClick={() => { /*setEditing(true); */}}
      	className={props.classes.editIcon}
      	>
      	<EditIcon />
      </IconButton>
		</ListItemIcon>

		<ListItemIcon>
			<IconButton 
      	aria-label="Delete"
      	onClick={() => { /*actions.deleteTodo(todo._id); */}}
      	>
      	<DeleteIcon />
      </IconButton>
		</ListItemIcon>

  </ListItem>

);

export default withStyles(styles)(TodoItem);