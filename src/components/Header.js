import React, { Component } from 'react';
import { connect } from 'react-redux';

import headerConfig from '../../config/headerConfig.json';
import HeaderItem from './HeaderItem';

export class Header extends Component {

    constructor() {
        super();
    };
    
   render() {
        //sort menu items
        const menuItems = headerConfig.menuItems.sort((a, b) => a.order - b.order);
        return (
            <header className='header'>
                <h1 className='header__title'>{this.props.map.name}</h1>
                <div className='header__items'>
                    {
                        menuItems.map((item) => <HeaderItem className='header__item' key={item.name} item={item} />)
                    }
                </div>
            </header>
        );
    }
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps)(Header);
