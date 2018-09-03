import React from 'react';

const Location = (props) => (
  <div className='location'>
    <div className='location__header'>
      <img className='location__image' src={props.locationImage} alt='placeholder' height="75" width="75"></img>
      <h3 className='location__name'>{props.locationText}</h3>
    </div>
      <h4 className='location__description'>{props.locationDescription}</h4>
  </div>
);

export default Location;
