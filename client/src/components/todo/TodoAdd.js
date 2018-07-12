import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const TodoAdd = (props) => (

  <Grid container spacing={8} justify="center">
 
    <Grid item xs={10}>
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

export default TodoAdd;
