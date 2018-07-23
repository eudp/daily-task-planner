import React, { Fragment, Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import TodoItem from './TodoItem';
import TodoAdd from './TodoAdd';


class TodoList extends Component {

	state = {
		tasks: this.props.tasks
	};

	handleAdd = async text => {

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

	handleDelete = async id => {

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

	handleUpdate = async (id, text, done) => {

		try {

			await axios.put('/api/task', {
				id: id,
				text: text,
				done: done,
				date: this.props.date
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
							<TodoItem handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} key={task._id} task={task}/>
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