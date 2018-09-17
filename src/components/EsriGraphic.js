import React, { Component }from 'react';
import { connect } from 'react-redux';
import EsriLoaderReact from 'esri-loader-react';

export class EsriGraphic extends Component {

    constructor() {
        super();
    }
    
    render() {
        const options = {
            url: 'https://js.arcgis.com/4.8/'
        };
        return (
        <EsriLoaderReact
        className='esri-map'
        options={options}
        modulesToLoad={[
            'esri/Graphic',
            'esri/PopupTemplate'
        ]}
        onReady={({loadedModules: [
        Graphic,
        PopupTemplate
        ], containerNode}) => {
            var point = {
            type: "point",
            longitude: this.props.coordinates.longitude,
            latitude: this.props.coordinates.latitude
            };
        
            var markerSymbol = {
            type: "simple-marker",
            color: this.props.rgb
            };
    
            var attributes = this.props.data
        
            this.props.map.graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes,
            popupTemplate: new PopupTemplate({
                    title: '{name}',
                    content: 'Phone: {display_phone}'
                })
            });

            this.props.map.graphicsLayer.add(this.props.map.graphic);
        }}
        >
        </EsriLoaderReact>
        );
    }   
}

const mapStateToProps = state => {
    return { map: state.map };
};
  
export default connect(mapStateToProps)(EsriGraphic);
    