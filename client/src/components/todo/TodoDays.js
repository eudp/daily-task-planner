import React, { Component, Fragment } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TodoList from './TodoList';

class TodoDays extends Component { 

	constructor(props) {
		super(props);

		this.state = {
			todo: []
		};

	}

	async componentDidMount() {

		try {

			const res = await axios.get('/api/task?date=2018-07-01&type=m');

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

	cleaningTimezone = (date) => {

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

export default TodoDays;