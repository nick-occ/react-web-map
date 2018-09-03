import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setMapProps } from '../actions/map';
import { selectTotalRecord } from '../selectors/map';

export class IdentifySelector extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // this.nextClick = this.nextClick.bind(this);
  };

  nextClick(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <div className='identify-selector'>
        <a className='isDisabled prevSelector' href="#">&lt;</a>
        <label>Record {}  of {selectTotalRecord}</label>
        <a href="#" onClick={this.nextClick} className='nextSelector'>&gt;</a>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setMapProps: (map) => dispatch(setMapProps(map)),
  };
};

const mapStateToProps = state => {
  return { 
    map: state.map,
    totalRecord: totalRecord
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(IdentifySelector);