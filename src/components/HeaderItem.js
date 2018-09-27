import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setMapProps } from '../actions/map';

export class HeaderItem extends Component {

    constructor() {
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.textInput = React.createRef();
    }

    componentDidMount(){
        try {
            this.textInput.current.focus();
        } catch(err) {}
     }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            //make request to search service
            axios.post('http://localhost:3000/search', {
                term: $('#search-input').val(),
                longitude: this.props.map.center[0],
                latitude: this.props.map.center[1]
            }).then((res) => {
                this.props.setMapProps({
                    searchResults: res.data.businesses
                });
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    render() {
        //render header elements based on type
        switch (this.props.item.type) {
            case 'toggle':
                return <button className='btn btn-primary' data-toggle="button" aria-pressed="false" autoComplete="off">{this.props.item.name}</button>;
            case 'search':
                return <input ref={this.textInput} id="search-input" onKeyPress={this.handleKeyPress} type="text" className="form" placeholder="Find something" />;
            default:
                return <a className="nav-link active" href="#">{this.props.item.name}</a>
                
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMapProps: (map) => dispatch(setMapProps(map)),
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderItem);