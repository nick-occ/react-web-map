import React from 'react';

import Location from './Location';

const Locations = (props) => (
  <div>
    <div className="location-header">
      <h3 className="location-header__heading">Results</h3>
      {
        props.businesses.map((business, index) => (
          <Location
            key={business.name}
            data={business}
          />)
        )
      } 
    </div>
  </div>
);


  
export default Locations;
