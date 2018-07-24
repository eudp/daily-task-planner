import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = { date: new Date(), searchType: 'default'};

function reducer(state = initialState, action) {

	switch(action.type) {
		case 'CHANGE_DATE': 
			return { date: action.date, searchType: state.searchType };
		case 'CHANGE_TYPE':
			return { date: state.date, searchType: action.searchType };
		default:
			return state;
	}

}

const store = createStore(reducer);

ReactDOM.render(
	<App store={store}/>, 
	document.getElementById('root')
);

registerServiceWorker();
