import React from 'react';

const HeaderItem = (props) => {
    switch (props.item.type) {
        case 'toggle':
            return <button className='btn btn-primary' data-toggle="button" aria-pressed="false" autoComplete="off">{props.item.name}</button>
        case 'search':
            return <input type="text" className="form"></input>
        default:
            return <a className="nav-link active" href="#">{props.item.name}</a>
            
    }
}

export default HeaderItem;