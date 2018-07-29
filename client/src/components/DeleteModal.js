import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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

const styles = theme => ({
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

const DeleteModal = ({ classes, open, handleDeleteClose, handleDeleteComplete }) => {

	const handleDeleteAccepted = () => {
		handleDeleteComplete();
		handleDeleteClose();
	}

	return (
	  <Modal
      aria-labelledby="Delete task"
      open={open}
      onClose={handleDeleteClose}
    >
    	<div style={getModalStyle()} className={classes.paper}>
    		<Grid container spacing={8} justify="center">
	    		<Grid item xs={10}>
		        <Typography variant="title" id="modal-title">
		          Are you sure you want to delete this task?
		        </Typography>
			    </Grid>
  			</Grid>
  			<Grid item xs={2} className={classes.button}>
					<Button onClick={handleDeleteAccepted} size="small" variant="raised" color="primary" type="submit">
						Delete
					</Button>
				</Grid>
      </div>
    </Modal>
	);

}

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDeleteClose: PropTypes.func.isRequired,
  handleDeleteComplete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteModal);