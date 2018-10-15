import React from 'react';
import Location from '../containers/Location';

const Locations = (props) => {
    return (
        <div>
            <div className="location-header">
                <h3 className="location-header__heading">Results</h3>
                {
                    props.businesses.map((business) => (
                        <Location
                            key={business.id}
                            data={business}
                        />)
                    )
                }
            </div>
        </div>
    );
};

export default Locations;
