import React from 'react';

const stateFromStore = sessionStorage.getItem('user');
let state = stateFromStore ? JSON.parse(stateFromStore) : null;

/**
* this stores forceUpdate() functions for all mounted components
* that need user state
*/
const subscribers = [];

const unsubscribe = subscriber => {
	const index = subscribers.findIndex(subscriber);
	index >= 0 && subscribers.splice(index, 1);
};

const subscribe = subscriber => {
	subscribers.push(subscriber);

	/** 
	* for convinience, subscribe returns a function to remove 
	* the rerendering when it is no longer needed
	*/
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

			/**
			* remove rerenderComponent function since this component 
			* don't need to be rerendered any more
			*/
			this.unsubscribe();
		}
	};
};

export const update = newState => {
	state = newState;

	sessionStorage.setItem('user', state ? JSON.stringify(state) : null);

	/**
	* rerender all wrapped components to reflect current user state
	* rerendering allows it to use its new props or state
	*/
	subscribers.forEach(subscriber => subscriber());
}