import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EsriLoaderReact from 'esri-loader-react';

import {setGraphics} from '../actions/map';
import {getMapUrl, getMapView, getVisibleLayers} from '../selectors/map';
import IdentifyGrid from "../components/IdentifyGrid";

export class Identify extends  PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentRecord: 0,
            idResults: [],
            layerName: 'Identify',
            rowData: []
        };
        this.formattedResults = [];
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        if (e.target.id === 'next-rec-selector') {
            this.getRec('next');
        } else {
            this.getRec('prev');
        }
    };

    //get record based on button clicked in identify
    getRec(dir='next') {
        const {currentRecord, idResults} = this.state;
        let nextCurrRecord = currentRecord;
        if (dir === 'prev' && currentRecord > 0) {
            nextCurrRecord -= 1;
        } else if (dir === 'next' && currentRecord + 1 !== idResults.length) {
            nextCurrRecord += 1;
        } else {
            nextCurrRecord = 0;
        }
        this.setState({
            currentRecord: nextCurrRecord,
            layerName: this.formattedResults[nextCurrRecord].layerName,
            rowData: this.getRowData(this.formattedResults[nextCurrRecord].attributes)
        },() => {
            this.buttonVisible();
            this.props.setGraphics(
                [this.formattedResults[nextCurrRecord].graphic],
                'identifyGraphics'
            );
        });
    }

    buttonVisible() {
        this.visibility($('#prev-rec-selector'), this.state.currentRecord === 0 ? 'hidden' : 'visible');
        this.visibility($('#next-rec-selector'), this.state.currentRecord + 1 === this.state.idResults.length ? 'hidden' : 'visible');
    };

    //set button visibility based on the current record
    visibility(tag, visibility) {
        tag.css('visibility',visibility)
    };

    //store data results from identify operation
    getRowData(attributes) {
        return Object.keys(attributes).map((k) => {
            return {field: k, value: attributes[k]}
        });
    };

    formatGraphic(result) {
        switch(result.geometry.type) {
            case 'point':
                return {
                    geometry: {
                        type: 'point',
                        latitude: result.geometry['latitude'],
                        longitude: result.geometry['longitude'],
                        spatialReference: {
                            wkid: 3857
                        }
                    },
                    symbol: {
                        type: "simple-marker",
                        style: "circe",
                        color: "#fffc3c",
                        size: "32px",
                        outline: {
                            color: "#f00",
                            width: 1
                        }
                    }
                };
            case 'polyline':
                return {
                    geometry: {
                        type: 'polyline',
                        paths: result.geometry.paths,
                        spatialReference: {
                            wkid: 3857
                        }
                    },
                    symbol: {
                        type: "simple-line",
                        color: "#ffd202",
                        width: "2px",
                        style: "solid"
                    }
                }
            case 'polygon':
                return {
                    geometry: {
                        type: 'polygon',
                        rings: result.geometry.rings,
                        spatialReference: {
                            wkid: 3857
                        }
                    },
                    symbol: {
                        type: "simple-fill",
                        color: "#ffd202",
                        outline: {
                            color: "#f00",
                            width: "1px"
                        }
                    }
                };
        }
    }

    render() {
        const options = {url: 'https://js.arcgis.com/4.8/'};

        return (
            <div>
                <div id="dialog">
                    <div className='card identify-card'>
                        <h3 className='card-title'>{this.state.layerName}</h3>
                        <div className='identify-selector'>
                            <button
                                className='btn btn-sm btn-primary id-rec-selector'
                                id='prev-rec-selector'
                                onClick={this.handleClick}>&lt;
                            </button>
                            <h6>Record {this.state.currentRecord + 1} of {this.state.idResults.length} </h6>
                            <button
                                className='btn btn-sm btn-primary id-rec-selector'
                                id='next-rec-selector'
                                onClick={this.handleClick}>&gt;
                            </button>
                        </div>
                        <IdentifyGrid
                            rowData={this.state.rowData}
                        />
                    </div>
                </div>
                <EsriLoaderReact
                    options={options}
                    modulesToLoad={[
                        'esri/Graphic',
                        'esri/tasks/IdentifyTask',
                        'esri/tasks/support/IdentifyParameters',
                    ]}
                    onReady={({loadedModules: [
                        Graphic,
                        IdentifyTask,
                        IdentifyParameters
                        ],}) => {
                            const formatResults = (results) => {
                                //variable to store unique results
                                const formattedResults = [];
                                 results.forEach((result) => {
                                     let exists = false;
                                     formattedResults.forEach((newResult) => {

                                         if (_.isEqual(result, newResult) === true) {
                                             exists = true;
                                         }
                                     });
                                     if (exists === false) {
                                         formattedResults.push(result);
                                     }
                                 });
                                 return formattedResults.map((result) => {
                                     return {
                                         ...result,
                                         graphic: new Graphic(this.formatGraphic(result))
                                     }
                                 });
                            };

                            const handleIdentify = (evt) => {
                                identifyParams.set('geometry', evt.mapPoint);
                                identifyParams.set('mapExtent', getMapView(this.props.map)['extent']);
                                identifyParams.set('layerIds', getVisibleLayers(this.props.map));
                                identifyTask.execute(identifyParams).then((res) => {
                                    if (res.results.length > 0) {

                                        $("#dialog").dialog({
                                            title: 'Identify',
                                            resizable: false,
                                        });

                                        $("#dialog").on("dialogclose", ( event, ui ) => {
                                            //clear graphicsLayer
                                            this.props.setGraphics(
                                                [],
                                                'identifyGraphics'
                                            );
                                        });
                                        //show identify display
                                        $('.identify-card').css('display','inherit');

                                        //only pick necessary values
                                        const results = res.results.map((result) => {
                                            const layerResults = _.pick(result, ['layerId', 'layerName']);
                                            const featureResults = _.pick(result['feature'],['attributes', 'geometry']);
                                            return {...layerResults,...featureResults};
                                        });

                                        this.formattedResults = formatResults(results);

                                        this.setState({
                                            currentRecord: 0,
                                            idResults: this.formattedResults,
                                            layerName: this.formattedResults[0].layerName,
                                            rowData: this.getRowData(this.formattedResults[0].attributes)
                                        });

                                        this.buttonVisible();

                                        this.props.setGraphics(
                                            [this.formattedResults[0].graphic],
                                            'identifyGraphics'
                                        );
                                    }
                                });
                            };

                            const {map} = this.props;

                            //ESRI identify task
                            const identifyTask = new IdentifyTask(getMapUrl(map));

                            //ESRI identify parameters
                            const identifyParams = new IdentifyParameters({
                                tolerance: 3,
                                layerOption: "visible",
                                width: getMapView(map)['width'],
                                height: getMapView(map)['height'],
                                returnGeometry: true
                            });

                            map.mapView.on('click', handleIdentify);
                        }
                    }
                >
                </EsriLoaderReact>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setGraphics: (results, graphicsLayer) => dispatch(setGraphics(results, graphicsLayer))
  };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Identify);