import React from 'react';
import { connect } from 'react-redux';

import SearchType from '../components/navbar/SearchType'

const SearchTypeContainer = ({ searchType, dispatch }) => {

  const handleChange = event => {
    dispatch({ type: 'CHANGE_TYPE', searchType:  event.target.value});
  };

  return (
    <SearchType searchType={searchType} handleChange={handleChange} />
  );
  
}

function mapStateToProps(state) {
  return {
    searchType: state.searchType
  }
}

export default connect(mapStateToProps)(SearchTypeContainer);
