import React from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

const Picker = ({ date, handleDateChange }) => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="pickers">
        <DatePicker value={date} onChange={handleDateChange} />
      </div>
    </MuiPickersUtilsProvider>
  );
  
}


export default Picker;