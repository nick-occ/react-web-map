import React, { Component } from 'react';
import { connect } from 'react-redux';

import Location from './Location';

export class Locations extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="location-header">
          <h3 className="location-header__heading">Results</h3>
          {
            this.props.businesses.map((business, index) => (
              <Location
                key={business.id}
                data={business}
              />)
            )
          } 
        </div>
      </div>
    );
  }
} 

const mapStateToProps = state => {
  return { map: state.map };
};

export default connect(mapStateToProps)(Locations);
