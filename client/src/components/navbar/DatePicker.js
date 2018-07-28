import React from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import { IconButton, withStyles } from '@material-ui/core';

import classNames from 'classnames';
import { addDays, 
        endOfWeek, 
        startOfWeek, 
        endOfMonth, 
        startOfMonth,
        isSameDay,
        format,
        isValid,
        isWithinInterval } from 'date-fns'


const styles = theme => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
});

const Picker = ({ date, searchType, handleDateChange, classes }) => {

	const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {

		let start = null;
		let end = null;

		switch(searchType) {
			case 'week': 
				start = startOfWeek(selectedDate, {weekStartsOn: 1});
    		end = endOfWeek(selectedDate, {weekStartsOn: 1});
			case 'month':
				start = startOfMonth(selectedDate);
    		end = endOfMonth(selectedDate);
			default:
				start = selectedDate;
   			end = addDays(selectedDate, 3);
		}
    

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const wrapperClassName = classNames({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> { format(date, 'D')} </span>
        </IconButton>
      </div>
    );
  }

  const formatWeekSelectLabel = (date, invalidLabel) => {
    if (date === null) {
      return '';
    }

    if (date && isValid(date)) {
    	switch(searchType) {
				case 'week': 
					return `Week of ${format(startOfWeek(date, {weekStartsOn: 1}), 'MMM Do')}`;
				case 'month':
					return format(startOfMonth(date), 'MMMM')
				default:
					return format(date, 'MMM Do');
			}
    } else {
    	return invalidLabel;
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="pickers">
        <DatePicker 
        	value={date} 
        	onChange={handleDateChange} 
        	renderDay={renderWrappedWeekDay}
          labelFunc={formatWeekSelectLabel}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
  
}


export default withStyles(styles)(Picker);