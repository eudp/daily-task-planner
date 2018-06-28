import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';

class HomePage extends Component {
	state = {
		tasks: null
	}

	componentDidMount() {
		if (!this.props.user) {
			return;
		}

		axios.get('/api/task')
			.then(res => {
				this.setState({
					tasks: res.data
				});
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
				this.setState({
					tasks: []
				});
			});
	}

	render() {

		const { user } =  this.props;
		const { tasks } = this.state;
		return(
			<Fragment>
				{user && tasks &&
					<div>
						Welcome back, {user.userName}!

							{tasks.map((s, i) => <div key={i} primaryText={s} />)}
						
					</div>
				}
				{user && !tasks &&
					<div>Hold, on looking for your tasks...</div>
				}
				{!user &&
					<div>Hey! I don't recognize you! Register and log in using the link above</div>
				}
			</Fragment>
		);
	}
}

export default withUser(HomePage);