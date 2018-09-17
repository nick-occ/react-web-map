import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import EsriLoaderReact from 'esri-loader-react';
import IdentifyCard from './IdentifyCard';
import { setMapProps } from '../actions/map';

export class EsriMap extends Component {
    
    constructor() {
        super();
        this.handleIdentify = this.handleIdentify.bind(this);
        this.getRowData = this.getRowData.bind(this);
        this.getRec = this.getRec.bind(this);
    };

    getRec(dir='next') {
        let {idCurRec, idTotalRec, idResults} = this.props.map;
        if (dir === 'prev' && idCurRec > 0) {
            idCurRec--;
        } else if (dir === 'next' && idCurRec + 1 !== idTotalRec) {
            idCurRec++;
        } else {
            idCurRec = 0;
        }
        
        this.props.setMapProps({
            idCurRec: idCurRec,
            idData: this.getRowData(idResults[idCurRec])
        });
    }

    getRowData(res) {
        return Object.keys(res.feature.attributes).map((k) => {
        return {field: k, value: res.feature.attributes[k]}
        });
    }

    handleIdentify(evt) {
        let {idParams, idTask, mapView} = this.props.map;
        var props = this.props;
        var getRowData = this.getRowData;
        
        // get data to populate identify grid
        idParams.set('geometry', evt.mapPoint);
        idParams.set('mapExtent', mapView.extent);
        idTask.execute(idParams).then(function(res) {
            console.log('results', res);
            if (res.results.length > 0) {
                $("#dialog").dialog({
                    title: 'Identify',
                    width: '21.5rem',
                    height: '650'
                });

                $('.identify-card').css('display','block');
                props.setMapProps({
                    idCurRec: 0,
                    idTotalRec: res.results.length,
                    idLayer: res.results[0].layerName,
                    idResults: res.results,
                    idData: getRowData(res.results[0])
                });
            }
        }).catch((err) => console.log(err));
    }

    render() {
    
        const options = {
            url: 'https://js.arcgis.com/4.8/'
          };

        const columnDefs = [
              {headerName: "Field", field: "field"},
              {headerName: "Value", field: "value"}
            ];

        return (
            <div>
            <div id="dialog" title="Basic dialog">
                <IdentifyCard
                    key='identifyCard'
                    columnDefs={columnDefs}
                    currentRecord={this.props.map.idCurRec}
                    totalRecords={this.props.map.idTotalRec}
                    rowData={this.props.map.idData}
                    identifyLayer={this.props.map.idLayer}
                    getRec = {this.getRec}
                />
            </div>
            <EsriLoaderReact
                className='esri-map'
                options={options}
                modulesToLoad={[
                    'esri/Map',
                    'esri/Graphic',
                    'esri/views/MapView',
                    'esri/layers/MapImageLayer',
                    "esri/layers/GraphicsLayer",
                    'esri/identity/IdentityManager',
                    'esri/tasks/IdentifyTask',
                    'esri/tasks/support/IdentifyParameters',
                    'esri/core/watchUtils'
                  ]}
                onReady={({loadedModules: [
                  Map,
                  Graphic,
                  MapView,
                  MapImageLayer,
                  GraphicsLayer,
                  IdentityManager,
                  IdentifyTask,
                  IdentifyParameters,
                  watchUtils
                ], containerNode}) => {

                    axios.get('http://localhost:3000/config').then((res) => {
                        getToken(res.data.config);
                    }).catch((err) => console.log(err));

                    const getToken = (data) => {
                        axios.post('http://localhost:3000/token',{
                            username: jwt.sign(process.env.ARCGIS_USER, process.env.ARCGIS_SECRET),
                            password: jwt.sign(process.env.ARCGIS_PASS, process.env.ARCGIS_SECRET)
                        }).then((response) => {
                            let map = new Map({basemap: data.basemap});
                            let mapView = new MapView({
                                container: containerNode,
                                map,
                                center: data.center,
                                zoom: data.zoom
                            });

                            let identifyTask = new IdentifyTask(`${data.mapUrl}/${data.mapService}`);
                            let identifyParams = new IdentifyParameters({
                            tolerance: 3,
                            layerOption: "top",
                            width: mapView.width,
                            height: mapView.height
                            });

                            IdentityManager.registerToken({
                                token: jwt.verify(response.data.token, process.env.ARCGIS_SECRET),
                                server: data.mapUrl
                            });

                            let layer = new MapImageLayer({
                                url: `${data.mapUrl}/${data.mapService}`
                            });

                            let graphicsLayer = new GraphicsLayer();
                            let selectedGraphic = new GraphicsLayer();

                            map.add(layer);
                            map.add(graphicsLayer);
                            map.add(selectedGraphic)

                            mapView.on('click', this.handleIdentify);

                            watchUtils.whenTrue(mapView, "stationary", () => {
                                if (mapView.center) {
                                    this.props.setMapProps({
                                        center: [mapView.center.longitude, mapView.center.latitude]
                                    })
                                }
                            });

                            this.props.setMapProps({
                                name: data.name,
                                idTask: identifyTask,
                                idParams: identifyParams,
                                center: data.center,
                                graphic: new Graphic(),
                                graphicsLayer,
                                selectedGraphic,
                                mapView
                            });
                        })
                        .catch((err) => console.log(err));
                        }
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