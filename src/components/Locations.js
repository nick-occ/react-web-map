import React from 'react';

import Location from './Location';

const Locations = (props) => (
  <div>
    <div className="location-header">
      <h3 className="location-header__heading">Locations</h3>

      {props.locations.length === 0 &&
          <p className='location_message'>No locations found</p>}

      {
        props.locations.map((location, index) => (
          <Location
            key={location.name}
            locationText={location.name}
            locationImage={location.image}
            locationDescription={location.description}
          />)
        )
      }
    </div>
  </div>
);

export default Locations;
