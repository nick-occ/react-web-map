import React from 'react';
import Search from '../containers/Search';

const HeaderItem = (props) => {
    //render header elements based on type
    switch (props.item.type) {
        case 'toggle':
            return (
                <button
                    className='btn btn-primary'
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off">
                    {props.item.name}
                </button>
            );
        case 'search':
            return <Search/>;
        default:
            return (
                <a
                    className="nav-link active"
                    href="#"
                >
                    {props.item.name}
                </a>
            );
    }
};

export default HeaderItem;