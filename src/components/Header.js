import React from 'react';

import headerConfig from '../../config/headerConfig.json';
import HeaderItem from './HeaderItem';

const Header = (props) => {
    //sort menu items
    const menuItems = headerConfig.menuItems.sort((a, b) => a.order - b.order);
    return (
        <header className='header'>
            <h1 className='header__title'>{props.title}</h1>
            <div className='header__items'>
                {
                    menuItems.map((item) => <HeaderItem className='header__item' key={item.name} item={item} />)
                }
            </div>
        </header>
    );
};

export default Header;
