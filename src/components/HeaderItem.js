import React from 'react';
import Search from '../containers/Search';

const HeaderItem = (props) => {
    //render header elements based on type
    switch (props.item.type) {
        case 'toggle':
            return (
                <button
                    className='btn'
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off">
                    {props.item.name}
                </button>
            );
        case 'search':
            return <Search/>;
        case 'dropdown':
            return (
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id={props.item.id}
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {props.item.name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby={props.item.id}>
                        {
                            props.item.items.map((item) => {
                                return(<a key={item.id} className="dropdown-item" id={item.id} href="#">{item.name}</a>);
                            })
                        }
                    </div>
                </div>
            );
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