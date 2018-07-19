import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const getModalStyle = () => {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
	paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    margin: 'auto',
  },
});

class EditModal extends Component {

	state = {
		text: this.props.text
	}

	handleInputChanged = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleInputUpdate = (event) => {
		event.preventDefault();
		this.props.handleEditUpdate(this.state.text);
		this.props.handleEditClose();
	}

	render () {
		const { classes, open, handleEditClose, text } = this.props;

		return (
		  <Modal
	      aria-labelledby="Edit task"
	      open={open}
	      onClose={handleEditClose}
	    >
	    	<div style={getModalStyle()} className={classes.paper}>
	    		<form onSubmit={this.handleInputUpdate}>
		    		<Grid container spacing={8} justify="center">
			    		<Grid item xs={10}>
				        <Typography variant="title" id="modal-title">
				          Edit the content
				        </Typography>
				        <TextField
					        name="text"
					        type="text"
					        fullWidth
					        margin="normal"
					        defaultValue={text}
					        onChange={this.handleInputChanged}
					      />
					    </Grid>
		  			</Grid>
		  			<Grid item xs={2} className={classes.button}>
							<Button size="small" variant="raised" color="primary" type="submit">
								Edit
							</Button>
						</Grid>
	  			</form>
	      </div>
	    </Modal>
		);
	}
}

export default withStyles(styles)(EditModal);