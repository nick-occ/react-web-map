import React, { Component } from 'react';
import { connect } from 'react-redux';
import Location from '../containers/Location';
import {clearSearchResults} from "../actions/map";

export class Locations extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.clearSearchResults();
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.handleClick}
                    className="locations__close btn btn-sm btn-primary col-sm-1 offset-sm-11"
                >X
                </button>
                <div className="location-header">
                    {
                        this.props.businesses.map((business) => (
                            <Location
                                key={business.id}
                                data={business}
                            />)
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearSearchResults: () => dispatch(clearSearchResults())
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations)