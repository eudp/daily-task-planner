import React from 'react';

const stateFromStore = sessionStorage.getItem('user');
let state = stateFromStore ? JSON.parse(stateFromStore) : null;

const subscribers = [];

const unsubscribe = subscriber => {
	const index = subscribers.findIndex(subscriber);
	index >= 0 && subscribers.splice(index, 1);
};

const subscribe = subscriber => {
	subscribers.push(subscriber);
	return () => unsubscribe(subscriber);
};

export const withUser = Component => {
	return class WithUser extends React.Component {
		componentDidMount() {
			this.unsubscribe = subscribe(this.forceUpdate.bind(this));
		}

		render() {
			const newProps = { ...this.props, user:state};
			return <Component {...newProps} />;
		}

		componentWillUnmount() {
			this.unsubscribe();
		}
	};
};

export const update = newState => {
	state = newState;

	sessionStorage.setItem('user', state ? JSON.stringify(state) : null);
	subscribers.forEach(subscriber => subscriber());
}