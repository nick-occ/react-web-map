import React from 'react';

import Star from '../components/Star';

const setFillStar = (id, rating) => {
  if (id <= rating) {
    return ['full','full','full','full'];
  } else if (id === Math.ceil(rating) && rating % 2 !== 0) {
    return ['full','full','empty','empty'];
  } else {
    return ['empty','empty','empty','empty'];
  }
}


const Location = (props) => {

let {name, image_url, display_phone, price, rating, location} = props.data

return (
  
  <div className='location card'>
    <div className='card-body container-fluid'>
      <header className='row location__header'>
        <img 
        className='col-sm-4' 
        src={image_url} 
        width="75" 
        height="60">
        </img>
        <h6 className='col-sm-8 card-text'>{name}</h6>
      </header>
      <br/>
      <div>
        <div className='location__body'>
          <div className='col-sm-5'>
            <b>Address:</b>
          </div>
          <div className='col-sm-7'>
            <p>{location.address1}</p>
            <p>{location.address2}</p>
            <p>
              {location.city}, {location.state} {location.zip_code}
            </p>
          </div>
        </div>
        <br/>
        <div className='location__body'>
          <div className='col-sm-5'>
            <b>Phone:</b>
          </div>
          <div className='col-sm-7'>
            <p>{display_phone}</p>
          </div>
        </div>
      </div>
      <br/>
      <div className='row'>
        <div className='col-sm-6'>
          <p id='price'>{price}</p>
        </div>
        <div className='row col-sm-6'>
          {
            [1,2,3,4,5].map((i) => {
              return (
                <Star 
                key={i} 
                index={i} 
                data-star={i} 
                rating={rating} 
                fillStar={setFillStar(i,rating)}/>
                )
            })
          }
        </div>
      </div>
    </div>
  </div>
);
}

export default Location;
