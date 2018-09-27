import React, { Component }from 'react';
import { connect } from 'react-redux';
import EsriLoaderReact from 'esri-loader-react';

//create a graphic and draw it on the map
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
        options={options}
        modulesToLoad={[
            'esri/Graphic',
            'esri/PopupTemplate'
        ]}
        onReady={({loadedModules: [
        Graphic,
        PopupTemplate
        ], containerNode}) => {
            //point geometry
            const point = {
                type: "point",
                longitude: this.props.coordinates.longitude,
                latitude: this.props.coordinates.latitude
            };

            //marker symbol
            const markerSymbol = {
                type: "simple-marker",
                color: this.props.rgb
            };

            //attributes of feature
            const attributes = this.props.data;

            //draw graphic
            this.props.map.graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes,
            popupTemplate: new PopupTemplate({
                    title: '{name}',
                    content: 'Phone: {display_phone}'
                })
            });

            //add to graphics layer
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
    