import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import jwt from "jsonwebtoken";
import EsriLoaderReact from 'esri-loader-react';
import Graphics from '../components/Graphics';

import {setMapProps} from '../actions/map';

import Identify from './Identify';

export class EsriMap1 extends Component {

    constructor() {
        super();
    }

    formatGraphics(graphics) {
        return graphics.map((result) => {
           return {
               geometry: {
                   type: 'point',
                   latitude: result.coordinates['latitude'],
                   longitude: result.coordinates['longitude']
               },
               symbol: {
                   type: "simple-marker",
                   style: "square",
                   color: "blue",
                   size: "8px",
                   outline: {
                       color: [255, 255, 0],
                       width: 3
                   }
               },
               attributes: _.pick(result, ['location', 'name', 'phone'])
           };
        });
    }

    render() {
        const options = {url: 'https://js.arcgis.com/4.8/'};

        if (!this.props.map.config || !this.props.map.token) {
            return null
        }

        const {mapUrl, mapService, center, basemap, zoom} = this.props.map.config;
        const {mapView, token, searchResults} = this.props.map;

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

                            const mapView = new MapView({
                                container: 'esri-map',
                                map,
                                center,
                                zoom
                            });

                            //graphics for searching
                            const searchGraphics = new GraphicsLayer({
                                id: 'searchGraphics'
                            });

                            const identifyGraphics = new GraphicsLayer({
                                id: 'identifyGraphics',
                                opacity: .3
                            });

                            this.props.setMapProps({
                                mapView
                            });

                            const verifiedToken = jwt.verify(token, process.env.ARCGIS_SECRET);

                            IdentityManager.registerToken({
                                token: verifiedToken,
                                server: mapUrl
                            });

                            const mapLayer = new MapImageLayer({
                                url: `${mapUrl}/${mapService}`
                            });
                            map.addMany([mapLayer, searchGraphics, identifyGraphics]);
                        }
                    }
                >
                </EsriLoaderReact>
                {mapView && <Identify/>}
                {searchResults.length > 0
                &&
                <Graphics
                    graphics={this.formatGraphics(searchResults)}
                    graphicsLayer='searchGraphics'
                />}
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