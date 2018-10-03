import React, { Component } from 'react';
import { connect } from 'react-redux';

import LegendGroup from "./LegendGroup";

export class Legend extends Component {
    constructor() {
        super();
        this.getLayers = this.getLayers.bind(this);
    }

    getGroups(layerData) {
        return Object.keys(layerData).filter((layer) => {
            return layerData[layer]['parentLayerId'] === -1;
        });
    }

    getLayers(layerData, layerId) {
        return Object.keys(layerData).filter((layer) => {
            return layerData[layer]['parentLayerId'] === layerId;
        })
    }

    render() {
        const {layerData} = this.props.map;
        const groups = this.getGroups(layerData);

        return (
            <div id='legend'>
                <h1>Legend</h1>
                {
                    groups.map((group) => <LegendGroup key={group} layerId={group} subLayers={this.getLayers(layerData, parseInt(group))} />)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps)(Legend);