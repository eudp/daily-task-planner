import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

class Picker extends PureComponent {

  handleDateChange = date => {
    this.props.dispatch({ type: 'CHANGE_DATE', date: date});
  };

  render() {

    const { date } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="pickers">
          <DatePicker value={date} onChange={this.handleDateChange} />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    date: state.date
  }
}

export default connect(mapStateToProps)(Picker);