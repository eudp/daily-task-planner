import React, { Fragment, Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import TodoItem from './TodoItem';
import TodoAdd from './TodoAdd';


class TodoList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			tasks: this.props.tasks
		}
	}

	handleAdd = async (text) => {

		try {

			const res = await axios.post('/api/task', {
										text: text,
										date: this.props.date
									});

			delete res.data.date;

			this.setState({
				tasks: [...this.state.tasks, res.data]
			});

		} catch (err) {
			console.log(err);
		}

	}

	handleDelete = async (id) => {

		try {

			await axios.delete('/api/task', {
				params: {
					id: id
				}
			});

			const newTasks = this.state.tasks.filter(obj => obj._id !== id);

			this.setState({
				tasks: newTasks
			});

		} catch (err) {
			console.log(err);
		}
		
	}

	render() {

		const { tasks } = this.state;

		return (
			<Fragment>

				{tasks.length ? (

							<List>
								{tasks.map((task) =>
									<TodoItem handleDelete={this.handleDelete} key={task._id} task={task} date={this.props.date}/>
								)}
							</List>

				) : (
					<Typography component="p" align="center" gutterBottom>
						Without tasks yet.
					</Typography>
				)}

				<Divider/>

				<TodoAdd handleAdd={this.handleAdd}/>

			</Fragment>
		);
	}

}

export default TodoList;