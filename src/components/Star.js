import _ from 'lodash'
import React from 'react';

//sets the fill portion of the star
const fillStar = (id, rating) => {
    let starImage;
    if (id <= rating) {
        starImage = 'star-full.png';
    } else if (id === Math.ceil(rating) && rating % 2 !== 0) {
        starImage = 'star-half.png';
    } else {
        starImage = 'star-empty.png';
    }
    return `/img/star/${starImage}`
};

const Star = (props) => {
    return _.range(1, props.totalStars + 1).map((i) => {
        //draw star polygons
        return (
            <div key={i} className='star'>
                <img src={fillStar(i, props.rating)}/>
            </div>
        )
    });
};

export default Star;