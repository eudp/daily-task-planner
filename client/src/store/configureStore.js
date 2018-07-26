import { createStore } from 'redux';

const initialState = { date: new Date(), searchType: 'default' };

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

export default function configureStore () {
	return createStore(reducer);
}