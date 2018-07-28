import { connect } from 'react-redux';

import Picker from '../components/navbar/DatePicker';

const mapStateToProps = state => {
  return {
    date: state.date,
    searchType: state.searchType
  }
}

const mapDispatchToProps = dispatch => {
	return {
		handleDateChange: date => {
			dispatch({ type: 'CHANGE_DATE', date });
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Picker);