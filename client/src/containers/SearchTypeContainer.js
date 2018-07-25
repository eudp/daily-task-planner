import { connect } from 'react-redux';

import SearchType from '../components/navbar/SearchType'

const mapStateToProps = state => {
  return {
    searchType: state.searchType
  }
}

const mapDispatchToProps = dispatch => {
	return {
		handleTypeChange: event => {
			dispatch({ type: 'CHANGE_TYPE', searchType:  event.target.value});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchType);
