import React, { Component } from 'react';
import { connect } from 'react-redux';
import EsriLoaderReact from 'esri-loader-react';

import { getMapUrl, getMapView } from '../selectors/map';
import IdentifyGrid from "./IdentifyGrid";

export class Identify extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRecord: 0,
            idResults: [],
            layerName: 'Identify',
            rowData: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.id === 'next-rec-selector') {
            this.getRec('next');
        } else {
            this.getRec('prev');
        }
    }

    //get record based on button clicked in identify
    getRec(dir='next') {
        let currRec = this.state.currentRecord;
        if (dir === 'prev' && currRec > 0) {
            currRec--;
        } else if (dir === 'next' && currRec + 1 !== this.state.idResults.length) {
            currRec++;
        } else {
            currRec = 0;
        }
        this.setState({
            currentRecord: currRec,
            layerName: this.state.idResults[currRec].layerName,
            rowData: this.getRowData(this.state.idResults[currRec])
        },() => this.buttonVisible());

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
    getRowData(res) {
        return Object.keys(res.feature.attributes).map((k) => {
            return {field: k, value: res.feature.attributes[k]}
        });
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
                        <IdentifyGrid rowData={this.state.rowData}/>
                    </div>
                </div>
                <EsriLoaderReact
                    options={options}
                    modulesToLoad={[
                        'esri/tasks/IdentifyTask',
                        'esri/tasks/support/IdentifyParameters',
                    ]}
                    onReady={({loadedModules: [
                        IdentifyTask,
                        IdentifyParameters
                        ],}) => {
                            const handleIdentify = (evt) => {
                                identifyParams.set('geometry', evt.mapPoint);
                                identifyParams.set('mapExtent', getMapView(this.props.map)['extent']);
                                identifyTask.execute(identifyParams).then((res) => {

                                    if (res.results.length > 0) {
                                        $("#dialog").dialog({
                                            title: 'Identify',
                                            width: '21.5rem',
                                            height: '650',
                                            resizable: false,
                                        });
                                        //show identify display
                                        $('.identify-card').css('display','block');

                                        console.log('results', res);
                                        console.log('rowData', this.getRowData(res.results[0]));
                                        this.setState({
                                            currentRecord: 0,
                                            idResults: res.results,
                                            layerName: res.results[0].layerName,
                                            rowData: this.getRowData(res.results[0])
                                        });
                                        this.buttonVisible();
                                    }
                                });
                            };

                            const {map} = this.props;

                            //ESRI identify task
                            const identifyTask = new IdentifyTask(getMapUrl(map));

                            //ESRI identify parameters
                            const identifyParams = new IdentifyParameters({
                                tolerance: 3,
                                layerOption: "top",
                                width: getMapView(map)['width'],
                                height: getMapView(map)['height']
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

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps)(Identify);