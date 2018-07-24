import React from 'react';
import { connect } from 'react-redux';

import Picker from '../components/navbar/DatePicker';

const PickerContainer = ({ date, dispatch }) => {

  const handleDateChange = date => {
    dispatch({ type: 'CHANGE_DATE', date: date});
  };

  return (
    <Picker date={date} handleDateChange={handleDateChange}/>
  );
  
}

function mapStateToProps(state) {
  return {
    date: state.date
  }
}

export default connect(mapStateToProps)(PickerContainer);