import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from "jsonwebtoken";
import EsriLoaderReact from 'esri-loader-react';

import {setMapProps, getToken, getConfig} from '../actions/map';

import Identify from '../components/Identify';

export class EsriMap1 extends Component {

    constructor() {
        super();
        this.mapView = null;
    }

    componentDidMount() {
        this.props.getToken();
        this.props.getConfig();
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
                        'esri/layers/MapImageLayer',
                        'esri/views/MapView'
                    ]}
                    onReady={({loadedModules: [
                        Map,
                        IdentityManager,
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
        getToken: () => dispatch(getToken()),
        getConfig: () => dispatch(getConfig()),
        setMapProps: (map) => dispatch(setMapProps(map))
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(EsriMap1);