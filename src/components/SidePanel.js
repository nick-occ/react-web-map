import React, { Component } from 'react';
import { connect } from 'react-redux';

import Locations from './Locations'

export class SidePanel extends Component{
  state = {
    businesses: [
      {
        id: 1,
        name: 'Twenty-Six Acres Brewing',
        coordinates: {
          latitude: 35.388337119113, 
          longitude: -80.7231580093503
        },
        location: {
          address1: "7285 W Winds Blvd NW", 
          address2: "", 
          address3: null, 
          city: "Concord", 
          state: "NC",
          zip_code: "28027"
        },
        display_phone: "(980) 277-2337",
        price: "$$",
        rating: 4,
        image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/DEJELsPv-gscsC4ojnj9ow/o.jpg"
      }, 
      {
        id: 2,
        name: 'Divine Barrel Brewing',
        coordinates: {
          latitude: 35.2503794230232, 
          longitude: -80.7963643456155
        },
        location: {
          address1: "3701 N Davidson St",
          address2: "Ste 203",
          address3: null,
          city: "Charlotte",
          state: "NC",
          zip_code: "28205"
        },
        display_phone: "(980) 277-2337",
        price: "$",
        rating: 5,
        image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/4VX9wjRy-QhYs8RseJvflA/o.jpg"
      },
      {
        id: 3,
        name: 'NoDa Brewing Company',
        coordinates: {
          latitude: 35.251678,
          longitude: -80.812637
        },
        location: {
          address1: "2921 N Tryon St",
          address2: "",
          address3: "",
          city: "Charlotte",
          state: "NC",
          zip_code: "28206"
        },
        display_phone: "(704) 900-6851",
        price: "$",
        rating: 4.5,
        image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/BB5s3TrjOZDIzHlKioJm8w/o.jpg"
      }
  ]
  };

  constructor() {
    super();
  }

  render() {
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