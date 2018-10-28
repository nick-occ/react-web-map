import React from 'react';

import headerConfig from '../../config/headerConfig.json';
import HeaderItem from './HeaderItem';

const Header = (props) => {
    //sort menu items
    const menuItems = headerConfig.menuItems.sort((a, b) => a.order - b.order);
    return (
        <nav className='header navbar navbar-dark navbar-expand-sm '>
            <h1 className='navbar-brand header__title'>{props.title}</h1>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span
                    className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className='navbar-nav header__items'>
                        {
                            menuItems.map((item) => <HeaderItem className='nav-item' key={item.name} item={item} />)
                        }
                    </div>
            </div>
        </nav>
    );
};

export default Header;
