import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const styles = theme => ({
	editIcon: {
		marginRight: 0
	},
});

class TodoItem extends Component {

	state = {
		done: this.props.task.done,
		text: this.props.task.text,
		editOpen: false,
		deleteOpen: false
	};

	handleCheckbox = event => {
		this.setState({
			done: event.target.checked
		}, () => this.props.handleUpdate(this.props.task._id, this.state.text, this.state.done));
	}

	handleEditComplete = text => {
		this.setState({
			text: text
		}, () => this.props.handleUpdate(this.props.task._id, this.state.text, this.state.done));
	}

	handleEditToggle = () => {
		this.setState({editOpen: !this.state.editOpen});
	}

	handleDeleteComplete = () => {
		this.props.handleDelete(this.props.task._id);
	}

	handleDeleteToggle = () => {
		this.setState({deleteOpen: !this.state.deleteOpen});
	}

	render() {

		const { classes } = this.props;
		const { done, text, editOpen, deleteOpen } = this.state;

		return (
			<Fragment>
				<ListItem 
					role={undefined} 
					dense 
					disableGutters
				>
					<Checkbox
						checked={done}
						tabIndex={-1}
						onChange={this.handleCheckbox}
						name="done"
					/>

					<ListItemText primary={text} />

					<ListItemIcon>
						<IconButton 
			      	aria-label="Edit"
			      	onClick={this.handleEditToggle}
			      	className={classes.editIcon}
			      	>
			      	<EditIcon />
			      </IconButton>
					</ListItemIcon>

					<ListItemIcon>
						<IconButton 
			      	aria-label="Delete"
			      	onClick={this.handleDeleteToggle}
			      	>
			      	<DeleteIcon />
			      </IconButton>
					</ListItemIcon>

			  </ListItem>

			  <EditModal
			  	open={editOpen}
			  	handleEditComplete={this.handleEditComplete}
	        handleEditClose={this.handleEditToggle}
	        text={text}
	      />

	      <DeleteModal
			  	open={deleteOpen}
			  	handleDeleteComplete={this.handleDeleteComplete}
	        handleDeleteClose={this.handleDeleteToggle}
	      />

      </Fragment>
      
		);

	}

}

export default withStyles(styles)(TodoItem);