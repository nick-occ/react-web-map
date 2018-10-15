import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from "jsonwebtoken";
import EsriLoaderReact from 'esri-loader-react';

import {setMapProps} from '../actions/map';

import Identify from './Identify';

export class EsriMap1 extends Component {

    constructor() {
        super();
        this.mapView = null;
    }

    render() {
        const options = {url: 'https://js.arcgis.com/4.8/'};

        if (!this.props.map.config || !this.props.map.token) {
            return null
        }

        const {mapUrl, mapService, center, basemap, zoom} = this.props.map.config;
        const {token} = this.props.map;

        return (
            <div id='esri-map'>
                <EsriLoaderReact
                    options={options}
                    modulesToLoad={[
                        'esri/Map',
                        'esri/identity/IdentityManager',
                        "esri/layers/GraphicsLayer",
                        'esri/layers/MapImageLayer',
                        'esri/views/MapView'
                    ]}
                    onReady={({loadedModules: [
                        Map,
                        IdentityManager,
                        GraphicsLayer,
                        MapImageLayer,
                        MapView
                        ],}) => {
                            const map = new Map({basemap});

                            this.mapView = new MapView({
                                container: 'esri-map',
                                map,
                                center,
                                zoom
                            });

                            const graphicsLayer = new GraphicsLayer();

                            this.props.setMapProps({
                                mapView: this.mapView
                            });

                            const verifiedToken = jwt.verify(token, process.env.ARCGIS_SECRET);

                            IdentityManager.registerToken({
                                token: verifiedToken,
                                server: mapUrl
                            });

                            const mapLayer = new MapImageLayer({
                                url: `${mapUrl}/${mapService}`
                            });
                            map.add(mapLayer);
                            map.add(graphicsLayer);
                        }
                    }
                >
                </EsriLoaderReact>
                {this.mapView && <Identify/>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMapProps: (map) => dispatch(setMapProps(map))
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(EsriMap1);