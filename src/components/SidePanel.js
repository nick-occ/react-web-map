import React, { Component } from 'react';
import { connect } from 'react-redux';

import Locations from './Locations'

export class SidePanel extends Component{

  constructor() {
    super();
  }

  render() {
    //get search results and if there are results display results
    if (this.props.map.searchResults) {
      return this.props.map.searchResults.length > 0 
      ? 
      <div className='side-panel-section'>
        <Locations businesses={this.props.map.searchResults} />
      </div> 
      : null
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return { map: state.map };
};

export default connect(mapStateToProps)(SidePanel);