import React from 'react';
import Locations from './Locations';

const SidePanel = (props) => {
    if (props.searchResults.length > 0) {
        return (
            <div className='side-panel-section'>
                <Locations businesses={props.searchResults}/>
            </div>
        )
    } else {
        return null;
    }
};

export default SidePanel;