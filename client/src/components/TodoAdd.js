import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paddingAddForm: {
    paddingRight: '10% !important',
    paddingLeft: '10% !important'
  }
}


const TodoAdd = (props) => (

  <Grid container spacing={24}>
 
    <Grid item xs={12} className={props.classes.paddingAddForm}>
      <TextField
        name="todo-add"
        label="What needs to be done?"
        type="text"
        fullWidth
        margin="normal"
      />
    </Grid>

  </Grid>

);

export default withStyles(styles)(TodoAdd);
