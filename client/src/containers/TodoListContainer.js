import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskApi } from '../api/taskApi';

import TodoList from '../components/TodoList';

class TodoListContainer extends Component {

	state = {
		tasks: this.props.tasks
	};

	handleAdd = async text => {

		try {

			const res = await TaskApi.createTask({
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

			await TaskApi.removeTask({ params: { id } });

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

			await TaskApi.updateTask({
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

TodoListContainer.propTypes = {
	date: PropTypes.string.isRequired,
	tasks: PropTypes.array.isRequired
};

export default TodoListContainer;