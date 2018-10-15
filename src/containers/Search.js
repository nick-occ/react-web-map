import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getSearchResults} from "../actions/map";
import { getMapView } from '../selectors/map';

export class Search extends  Component {
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
            const {longitude, latitude} = getMapView(this.props.map)['center'];
            //make request to search service
            this.props.getSearchResults($('#search-input').val(), longitude, latitude)
        }
    }

    render() {
        return (
            <input
            ref={this.textInput}
            id="search-input"
            onKeyPress={this.handleKeyPress}
            type="text"
            className="form"
            placeholder="Find something"
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchResults: (term, lat, lng) => dispatch(getSearchResults(term, lat, lng))
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);