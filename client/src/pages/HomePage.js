import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { List, ListItem } from 'material-ui/List';
import { withUser } from '../services/withUser';

class HomePage extends Component {
	state = {
		stuff: null
	}

	componentDidMount() {
		if (!this.props.user) {
			return;
		}

		axios.get('/api/stuff')
			.then(res => {
				this.setState({
					stuff: res.data
				});
			})
			.catch(err => {
				console.log(err);
				this.setState({
					stuff: []
				});
			});
	}

	render() {

		const { user } =  this.props;
		const { stuff } = this.state;

		return(
			<Fragment>
				{user && stuff &&
					<div>
						Welcome back, {user.username}!

						<List>
							{stuff.map((s, i) => <ListItem key={i} primaryText={s} />)}
						</List>
					</div>
				}
				{user && !stuff &&
					<div>Hold, on looking for your stuff...</div>
				}
				{!user &&
					<div>Hey! I don't recognize you! Register and log in using the link above</div>
				}
			</Fragment>
		);
	}
}

export default withUser(HomePage);