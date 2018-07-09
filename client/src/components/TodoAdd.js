import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const TodoAdd = (props) => (
  <Grid container spacing={24}>
    <Grid item xs={1}/>

    <Grid item xs={10}>
      <TextField
        name="todo-add"
        label="What needs to be done?"
        type="text"
        fullWidth
        margin="normal"
      />
    </Grid>

    <Grid item xs={1}/>
  </Grid>

);

export default TodoAdd;
