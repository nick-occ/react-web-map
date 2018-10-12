import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setMapProps, getSearchResults } from '../actions/map';

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
            const {longitude, latitude} = this.props.map.mapView.center;
            //make request to search service
            this.props.getSearchResults($('#search-input').val(), longitude, latitude)
        }
    }

    render() {
        //render header elements based on type
        switch (this.props.item.type) {
            case 'toggle':
                return (
                    <button
                        className='btn btn-primary'
                        data-toggle="button"
                        aria-pressed="false"
                        autoComplete="off">
                        {this.props.item.name}
                    </button>
                );
            case 'search':
                return (
                    <input
                        ref={this.textInput}
                        id="search-input"
                        onKeyPress={this.handleKeyPress}
                        type="text"
                        className="form"
                        placeholder="Find something"
                    />
                );
            default:
                return (
                    <a
                        className="nav-link active"
                        href="#"
                    >
                        {this.props.item.name}
                    </a>
                );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMapProps: (map) => dispatch(setMapProps(map)),
        getSearchResults: (term, lat, lng) => dispatch(getSearchResults(term, lat, lng))
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderItem);