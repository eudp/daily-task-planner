import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class TodoAdd extends Component {

  state = {
    text: ''
  };

  handleInputChanged = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitAdd = event => {
    event.preventDefault(); 

    const { text } = this.state;
    
    this.props.handleAdd(text);

    this.setState({
      text: ''
    });

  }

  render() {

    const { text } = this.state;

    return (

      <form onSubmit={this.handleSubmitAdd}>
        <Grid container spacing={8} justify="center">
       
          <Grid item xs={10}>
            <TextField
              name="text"
              label="What needs to be done?"
              type="text"
              fullWidth
              margin="normal"
              onChange={this.handleInputChanged}
              value={text}
            />
          </Grid>

        </Grid>
      </form>

    );
  }
}

TodoAdd.propTypes = {
  handleAdd: PropTypes.func.isRequired
};

export default TodoAdd;
