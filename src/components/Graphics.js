import React, { Component } from 'react';
import { connect } from 'react-redux';
import EsriLoaderReact from 'esri-loader-react';
import { setSearchGraphics } from "../actions/map";
import _ from "lodash";

export class Graphics extends Component {
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
            }
        });
    }

    render() {
        const options = {url: 'https://js.arcgis.com/4.8/'};
        if (this.props['graphics'].length > 0) {
            return (
                 <EsriLoaderReact
                    options={options}
                    modulesToLoad={[
                        'esri/Graphic'
                    ]}
                    onReady={({loadedModules: [
                        Graphic
                        ],}) => {
                            if (this.props['graphics'].length > 0) {
                                this.props.setSearchGraphics(
                                    this.formatGraphics(this.props.graphics)
                                        .map((graphic) => new Graphic(graphic)
                                    )
                                );
                            }
                        }
                    }
                >
                </EsriLoaderReact>
            )
        } else {
            return null;
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchGraphics: (results) => dispatch(setSearchGraphics(results))
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graphics);