import React, { Component, Fragment } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { withUser } from '../services/withUser';

import TodoTasks from './TodoTasks';
import TodoAdd from './TodoAdd';

class TodoList extends Component { 

	state = {
		todo: []
	}

	componentDidMount() {

		if (!this.props.user) {
			return;
		}

		axios.get('/api/task?date=2018-07-01&type=m')
			.then(res => {
				this.setState({
					todo: res.data
				});
			})
			.catch(err => {
				this.setState({
					todo: []
				});
			});

	}
	render () {

		const { todo } = this.state;

		return(
			<Grid container spacing={24}>
				{!todo &&
					<Grid item xs={12} >
						<Typography component="p">
							Hold, on looking for your tasks...
						</Typography>
					</Grid>
				}
				{todo &&
					<Fragment>
						{todo.map((currentValue, index) => 
							
							<Grid item xs={12} md={3} key={currentValue.date}>

								<Paper>

									<Typography variant="headline" component="h3" align="center" gutterBottom>
										{format(currentValue.date, 'MMMM D, YYYY')}
									</Typography>


									<TodoTasks tasks={currentValue.tasks}/>

									<Divider/>

									<TodoAdd date={currentValue.date}/>

								</Paper>

							</Grid>

						)}
					</Fragment>
				}
			</Grid>
		);
	}
}

export default withUser(TodoList);