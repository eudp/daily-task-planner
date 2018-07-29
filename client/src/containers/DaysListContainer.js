import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import {addHours,
				addDays, 
				endOfWeek, 
				startOfWeek, 
				endOfMonth, 
				startOfMonth,
				isSameDay } from 'date-fns';

import { update } from '../services/withUser';
import { TaskApi } from '../api/taskApi.js';

import DaysList from '../components/DaysList';
import SnackbarError from '../components/SnackbarError';

class DayListContainer extends Component { 

	state = {
		tasks: [],
		error: null
	};

	componentWillReceiveProps({ date, searchType }) {
    this.getTasks(date, searchType);
  }

	componentDidMount() {
		this.getTasks(this.props.date, this.props.searchType);
	}

	getTasks = async (searchDate, searchType) => {

		const date = format(searchDate, 'YYYY-MM-DD');
		const type = searchType[0];
		
		try {

			const res = await TaskApi.getTasks({ params: { date, type } });

			const { startDate, endDate } = this.getLimitDate();
			let i = 0;

			for (let date = startDate; date <= endDate; date = addDays(date, 1)) {

				/**
				* if the user hasn't tasks that day (doesn't match the days), it creates the empty day 
				* on the state
				*/
				if (res.data[i] === undefined || !isSameDay(date, this.cleaningTimezone(res.data[i]._id))){	
					res.data.splice(i, 0, {_id: date.toISOString(), tasks: []});
				} 
				i++;

			}

			this.setState({ tasks: res.data });

		} catch (err) {
			
			if (err.response.status === 401) {
				update(null);
			} else {
				this.setState({
					error: `${err.response.statusText} - ${err.response.status}`,
				});
			}
			
		}

	}

	getLimitDate = () => {

		const { date, searchType } = this.props;
		let startDate, endDate;
		
		switch(searchType) {
			case 'week':
				startDate = startOfWeek(date, {weekStartsOn: 1});
				endDate = endOfWeek(date, {weekStartsOn: 1});
				break;
			case 'month':
				startDate = startOfMonth(date);
				endDate = endOfMonth(date);
				break;
			default:
				startDate = date;
				endDate = addDays(date, 3);
		}

		return { startDate, endDate };
	}

	/*
	* cleaningTimezone returns a date converted into timezone of the browser
	*/
	cleaningTimezone = date => {

		const currentDate = new Date(date);
		const timezone = currentDate.getTimezoneOffset() / 60;

		return addHours(currentDate, timezone).toString();
	}

	handleErrorDelete = () => {
		this.setState({
			error: null,
		});
	}

	render () {

		const { tasks, error } = this.state;

		return(
			<Fragment>
				<DaysList tasks={tasks} cleaningTimezone={this.cleaningTimezone}/>
				{error &&
					<SnackbarError text={error} handleErrorDelete={this.handleErrorDelete}/>
				}
			</Fragment>
		);
	}
}

DayListContainer.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	searchType: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
  	date: state.date,
    searchType: state.searchType
  }
}

export default connect(mapStateToProps)(DayListContainer);