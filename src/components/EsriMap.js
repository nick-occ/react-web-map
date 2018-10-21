import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import EsriLoaderReact from 'esri-loader-react';

import { setMapProps } from '../actions/map';

export class EsriMap extends Component {
    
    constructor() {
        super();
        this.handleIdentify = this.handleIdentify.bind(this);
        this.getRowData = this.getRowData.bind(this);
        this.getRec = this.getRec.bind(this);
    };

    //get record based on button clicked in identify
    getRec(dir='next') {
        let {idCurRec, idTotalRec, idResults} = this.props.map;
        if (dir === 'prev' && idCurRec > 0) {
            idCurRec--;
        } else if (dir === 'next' && idCurRec + 1 !== idTotalRec) {
            idCurRec++;
        } else {
            idCurRec = 0;
        }

        //set state in redux store
        this.props.setMapProps({
            idCurRec: idCurRec,
            idData: this.getRowData(idResults[idCurRec])
        });
    }

    //store data results from identify operation
    getRowData(res) {
        return Object.keys(res.feature.attributes).map((k) => {
            return {field: k, value: res.feature.attributes[k]}
        });
    }

    //identify event handler
    handleIdentify(evt) {
        let {idParams, idTask, mapView} = this.props.map;
        const props = this.props;
        const getRowData = this.getRowData;

        //set identify location parameters
        idParams.set('geometry', evt.mapPoint);
        idParams.set('mapExtent', mapView.extent);

        //execute identify task
        idTask.execute(idParams).then((res) => {
            if (res.results.length > 0) {
                $("#dialog").dialog({
                    title: 'Identify',
                    width: '21.5rem',
                    height: '650'
                });

                //show identify display
                $('.identify-card').css('display','block');

                //set state in redux store
                props.setMapProps({
                    idCurRec: 0,
                    idTotalRec: res.results.length,
                    idLayer: res.results[0].layerName,
                    idResults: res.results,
                    idData: getRowData(res.results[0])
                });
            }
        }).catch((err) => console.error(err));
    }

    render() {
        let layerData = {};
        let layerPromises;

        const options = {
            url: 'https://js.arcgis.com/4.8/'
          };

        //columns for identify grid
        const columnDefs = [
              {headerName: "Field", field: "field"},
              {headerName: "Value", field: "value"}
            ];

        return (
            <div id="esri-map">
            <div id="dialog">

            </div>
            <EsriLoaderReact
                options={options}
                modulesToLoad={[
                    'esri/Map',
                    'esri/Graphic',
                    'esri/core/watchUtils',
                    'esri/identity/IdentityManager',
                    'esri/layers/MapImageLayer',
                    "esri/layers/GraphicsLayer",
                    'esri/tasks/IdentifyTask',
                    'esri/tasks/support/IdentifyParameters',
                    'esri/views/MapView',
                    'esri/widgets/Legend'
                ]}
                onReady={({loadedModules: [
                  Map,
                  Graphic,
                  watchUtils,
                  IdentityManager,
                  MapImageLayer,
                  GraphicsLayer,
                  IdentifyTask,
                  IdentifyParameters,
                  MapView,
                  Legend
                ], }) => {

                    //make request to config to get configuration data
                    axios.get('http://localhost:3000/config').then((res) => {
                        getToken(res.data.config);

                    }).catch((err) => console.error(err));


                    //get ESRI token to authenticate map service
                    const getToken = (data) => {
                        axios.post('http://localhost:3000/token',{
                            username: jwt.sign(process.env.ARCGIS_USER, process.env.ARCGIS_SECRET),
                            password: jwt.sign(process.env.ARCGIS_PASS, process.env.ARCGIS_SECRET)
                        }).then((response) => {
                            let map = new Map({basemap: data.basemap});
                            let mapView = new MapView({
                                container: 'esri-map',
                                map,
                                center: data.center,
                                zoom: data.zoom
                            });

                            //ESRI identify task
                            let identifyTask = new IdentifyTask(`${data.mapUrl}/${data.mapService}`);
                            //ESRI identify parameters
                            let identifyParams = new IdentifyParameters({
                                tolerance: 3,
                                layerOption: "top",
                                width: mapView.width,
                                height: mapView.height
                            });

                            //ESRI token
                            const token = jwt.verify(response.data.token, process.env.ARCGIS_SECRET);
                            //ESRI Identity manager
                            IdentityManager.registerToken({
                                token,
                                server: data.mapUrl
                            });

                            //ESRI map layer from map service
                            let layer = new MapImageLayer({
                                url: `${data.mapUrl}/${data.mapService}`
                            });

                            //layer for ESRI graphics
                            let graphicsLayer = new GraphicsLayer();

                            //add to map object
                            map.add(layer);
                            map.add(graphicsLayer);

                            // const legend = new Legend({
                            //     view: mapView
                            // });
                            //
                            // mapView.ui.add(legend, "bottom-right");

                            //get map information
                            axios.get(`${data.mapUrl}/${data.mapService}`, {
                                params: {
                                token,
                                f: 'json'}
                            }).then((json) => {
                                json.data['layers'].forEach((layer) => {
                                    layerData[layer.id] = layer;
                                });

                                layerPromises = Object.keys(layerData).map((id) => {
                                    return axios.get(`${data.mapUrl}/${data.mapService}/${id}`, {
                                        params: {
                                            token,
                                            f: 'json'}
                                    });
                                });

                                //resolve promises
                                axios.all(layerPromises).then((layers) => {
                                    layers.forEach((layer) => {
                                        layerData[layer.data.id] = {
                                            ...layerData[layer.data.id],
                                            ..._.pick(layer.data, ['geometryType', 'drawingInfo']),
                                            visibility: layerData[layer.data.id]['defaultVisibility']
                                        };
                                    });

                                    //set state in redux store
                                    this.props.setMapProps({
                                        layerData
                                    });
                                });

                            }).catch((err) => console.error(err));

                            //click event
                            mapView.on('click', this.handleIdentify);

                            //watch for changes in the map view
                            watchUtils.whenTrue(mapView, "stationary", () => {
                                if (mapView.center) {
                                    this.props.setMapProps({
                                        center: [mapView.center.longitude, mapView.center.latitude]
                                    })
                                }
                            });

                            //set state in redux store
                            this.props.setMapProps({
                                name: data.name,
                                idTask: identifyTask,
                                idParams: identifyParams,
                                center: data.center,
                                graphic: new Graphic(),
                                graphicsLayer,
                                mapView,
                                map
                            });
                        })
                        .catch((err) => console.error(err));
                        };

                    }

                }

            >
            </EsriLoaderReact>
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

export default connect(mapStateToProps, mapDispatchToProps)(EsriMap);