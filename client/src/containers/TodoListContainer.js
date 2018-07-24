import React, { Component } from 'react';
import axios from 'axios';

import TodoList from '../components/TodoList';

class TodoListContainer extends Component {

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
			<TodoList
				tasks={tasks} 
				handleDelete={this.handleDelete} 
				handleUpdate={this.handleUpdate} 
				handleAdd={this.handleAdd} 
			/>
		);
	}

}

export default TodoListContainer;