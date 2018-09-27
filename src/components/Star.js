import React from 'react';

const Star = (props) => {
    //draw star polygons
    let {fillStar} = props;
    return (
        <div className='star'>
            <svg height="20" width="20">
                <polygon className={fillStar[0]} id='star-upperleft' points="0,7 7,6 10,0 10,13"/>
                <polygon className={fillStar[1]} id='star-lowerleft' points="10,13 3,20, 7,7"/>
                <polygon className={fillStar[2]} id='star-upperright' points="20,7 13,6 10,0 10,13"/>
                <polygon className={fillStar[3]} id='star-lowerright' points="10,13 17,20, 13,7"/>
            </svg>
        </div>
    )
};

export default Star;