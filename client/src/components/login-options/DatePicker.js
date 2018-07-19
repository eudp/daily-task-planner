import React, { PureComponent } from "react";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker";

export default class App extends PureComponent {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="pickers">
          <DatePicker value={selectedDate} onChange={this.handleDateChange} />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}
