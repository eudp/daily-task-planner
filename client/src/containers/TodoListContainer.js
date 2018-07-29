import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { update } from '../services/withUser';
import { TaskApi } from '../api/taskApi';

import TodoList from '../components/TodoList';
import SnackbarError from '../components/SnackbarError';

class TodoListContainer extends Component {

	state = {
		tasks: this.props.tasks,
		error: null
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
			
			if (err.response.status === 401) {
				update(null);
			} else {
				console.log(`${err.response.statusText} - ${err.response.status}`)
				this.setState({
					error: `${err.response.statusText} - ${err.response.status}`,
				});
			}

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
			
			if (err.response.status === 401) {
				update(null);
			} else {
				this.setState({
					error: `${err.response.statusText} - ${err.response.status}`,
				});
			}

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
			
			if (err.response.status === 401) {
				update(null);
			} else {
				this.setState({
					error: `${err.response.statusText} - ${err.response.status}`,
				});
			}

		}

	}

	handleErrorDelete = () => {
		this.setState({
			error: null,
		});
	}

	render() {

		const { tasks, error } = this.state;

		return (
			<Fragment>
				<TodoList
					tasks={tasks} 
					handleDelete={this.handleDelete} 
					handleUpdate={this.handleUpdate} 
					handleAdd={this.handleAdd} 
				/>
				{error &&
					<SnackbarError text={error} handleErrorDelete={this.handleErrorDelete}/>
				}
			</Fragment>
		);
	}

}

TodoListContainer.propTypes = {
	date: PropTypes.string.isRequired,
	tasks: PropTypes.array.isRequired
};

export default TodoListContainer;