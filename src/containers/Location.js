import React, { Component }from 'react';
import { connect } from 'react-redux';

import Star from '../components/Star';
import { setCenter, setMapProps } from '../actions/map';

export class Location extends Component {

    constructor() {
        super();
    }

    //click event for location card
    handleClick(data) {
        //set mapView to location clicked
        this.props.setCenter([data.coordinates.longitude, data.coordinates.latitude],20);
    }

    render() {
        let {name, image_url, url, display_phone, price, rating, location, coordinates} = this.props.data;
        return (
            <div>
                <div onClick={() => this.handleClick(this.props.data)} className='location card'>
                    <div className='card-body container-fluid'>
                        <header className='row location__header'>
                            <img
                                className='col-sm-4'
                                src={image_url}
                                width="75"
                                height="60">
                            </img>
                            <a className='col-sm-8' href={url} target='_blank'><h6 className='card-text'>{name}</h6></a>
                        </header>
                        <br/>
                        <div>
                            <div className='location__body'>
                                <div className='col-sm-5'>
                                    <b>Address:</b>
                                </div>
                                <div className='col-sm-7'>
                                    <p>{location.address1}</p>
                                    <p>{location.address2}</p>
                                    <p>
                                        {location.city}, {location.state} {location.zip_code}
                                    </p>
                                </div>
                            </div>
                            <br/>
                            <div className='location__body'>
                                <div className='col-sm-5'>
                                    <b>Phone:</b>
                                </div>
                                <div className='col-sm-7'>
                                    <p>{display_phone}</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <p id='price'>{price}</p>
                            </div>
                            <div className='row col-sm-6'>
                                <Star
                                    totalStars={5}
                                    rating={rating}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMapProps: (map) => dispatch(setMapProps(map)),
        setCenter: (coords, zoom) => dispatch(setCenter(coords, zoom)),
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);