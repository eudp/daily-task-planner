import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

class SnackbarError extends React.Component {
  state = {
    open: true,
  };

  handleClick = state => () => {
    this.setState({ open: true});
  }

  handleClose = () => {
    this.props.handleErrorDelete();
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { text } = this.props;

    return (
      <Snackbar
        open={open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{text}</span>}
      />
    );
  }
}

SnackbarError.propTypes = {
  text: PropTypes.string.isRequired
};

export default SnackbarError;
