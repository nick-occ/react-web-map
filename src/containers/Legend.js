import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleLayerData } from '../actions/map';
import { getNoParentLayers, getParentLayers, getSublayer, isGroupLayer } from '../selectors/map';
import LegendGroup from './LegendGroup';
import LegendLayer from "./LegendLayer";

export class Legend extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const groups = getParentLayers(this.props.map);
        const noParentLayers = getNoParentLayers(this.props.map);
        const layers = groups.concat(noParentLayers).sort();
        console.log('layers', layers);

        return (
            <div id='legend'>
                <h1>Legend</h1>
                {
                    layers.map((layer) => {
                        if (isGroupLayer(this.props.map, layer)) {
                            return (
                                <LegendGroup
                                    key={layer}
                                    layerId={layer}
                                    subLayers={getSublayer(this.props.map, parseInt(layer))}
                                />)
                        } else {
                            return <LegendLayer key={layer} layerId={layer} />
                        }
                    })
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLayerData: (mapUrl, token) => dispatch(handleLayerData(mapUrl, token))
    }
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Legend);