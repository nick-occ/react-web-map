import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EsriLoaderReact from 'esri-loader-react';

import { setGraphics } from "../actions/map";

export class Graphics extends PureComponent {
    constructor() {
        super();
    }

    render() {
        const options = {url: 'https://js.arcgis.com/4.8/'};
            return (
                 <EsriLoaderReact
                    options={options}
                    modulesToLoad={[
                        'esri/Graphic'
                    ]}
                    onReady={({loadedModules: [
                        Graphic
                        ],}) => {
                            if (this.props.graphics) {
                                this.props.setGraphics(
                                    this.props.graphics.map((graphic) => new Graphic(graphic)),
                                    this.props.graphicsLayer
                                );
                            }
                        }
                    }
                >
                </EsriLoaderReact>
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

export default connect(mapStateToProps, mapDispatchToProps)(Graphics);