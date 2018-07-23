import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import format from 'date-fns/format';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {addHours,
				addDays, 
				endOfWeek, 
				startOfWeek, 
				endOfMonth, 
				startOfMonth,
				isSameDay } from 'date-fns';

import TodoList from './TodoList';

class TodoDays extends Component { 

	state = {
		todo: null
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

			const res = await axios.get(`/api/task?date=${date}&type=${type}`);

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

			this.setState({
				todo: res.data
			});

		} catch (err) {
			console.log(err);
			this.setState({
				todo: []
			});
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

	render () {

		const { todo } = this.state;

		return(
			<Grid container spacing={24} alignItems="center">
				{!todo &&
					<Grid item xs={12} >
						<Typography component="p">
							Hold, on looking for your tasks...
						</Typography>
					</Grid>
				}
				{todo &&
					<Fragment>
						{todo.map((dayList) => 
							
							<Grid item xs={12} md={3} key={dayList._id}>

								<Paper>

									<Typography variant="headline" component="h3" align="center" gutterBottom>
										{format(this.cleaningTimezone(dayList._id), 'MMMM D, YYYY')}
									</Typography>

									<TodoList handleDone={this.handleDone} tasks={dayList.tasks} date={format(this.cleaningTimezone(dayList._id), 'YYYY-MM-DD')}/>

								</Paper>

							</Grid>

						)}
					</Fragment>
				}
			</Grid>
		);
	}
}

function mapStateToProps(state) {
  return {
  	date: state.date,
    searchType: state.searchType
  }
}

export default connect(mapStateToProps)(TodoDays);