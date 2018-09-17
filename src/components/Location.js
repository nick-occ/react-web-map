import React, { Component }from 'react';
import { connect } from 'react-redux';

import EsriLoaderReact from 'esri-loader-react';

import Star from '../components/Star';
import EsriGraphic from '../components/EsriGraphic';
import { setMapProps } from '../actions/map';

export class Location extends Component {

  constructor() {
    super();
    this.setFillStar = this.setFillStar.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setFillStar(id, rating) {
    if (id <= rating) {
      return ['full','full','full','full'];
    } else if (id === Math.ceil(rating) && rating % 2 !== 0) {
      return ['full','full','empty','empty'];
    } else {
      return ['empty','empty','empty','empty'];
    }
  }

  handleClick(data) {
    this.props.map.graphicsLayer.removeAll();

    this.props.setMapProps({
      center: [data.coordinates.longitude, data.coordinates.latitude]
    });

    this.props.map.mapView.center = [data.coordinates.longitude, data.coordinates.latitude];

    let {graphic, graphicsLayer} = this.props.map;

    console.log(graphic.toJSON());
    
    graphic.geometry = {
      type: "point",
      longitude: data.coordinates.longitude,
      latitude: data.coordinates.latitude
    };
    graphic.symbol = {
      type: "simple-marker",
      color: [255,255,0]
    };
    graphic.attributes = data;

    graphic.setAttribute('name',data.name);
    
    graphicsLayer.add(graphic);

    this.props.setMapProps({
      graphic,
      graphicsLayer
    });

    this.forceUpdate();
  }

  render() {
    let {name, image_url, url, display_phone, price, rating, location, coordinates} = this.props.data;    
    return (
      <div>
      <EsriGraphic data={this.props.data} coordinates={coordinates} rgb={[255,0,0]}/>
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
            {
              [1,2,3,4,5].map((i) => {
                return (
                  <Star 
                  key={i} 
                  index={i} 
                  data-star={i} 
                  rating={rating} 
                  fillStar={this.setFillStar(i,rating)}/>
                  )
              })
            }
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
  };
};

const mapStateToProps = state => {
  return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);