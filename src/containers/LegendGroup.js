import React, { Component } from 'react';
import { connect } from 'react-redux';

import { allSublayersVisibility, getSublayer, getLayerVisibility } from '../selectors/map';
import { setVisibility } from '../actions/map';
import LegendLayer from './LegendLayer';

export class LegendGroup extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {layerId, map} = this.props;
        this.props.setVisibility(layerId);

        if (getLayerVisibility(map, layerId)) {
            getSublayer(map, layerId).forEach((layer) => {
                if (getLayerVisibility(map, layer) === false) {
                    this.props.setVisibility(layer);
                }
            });
        }

        if (getLayerVisibility(map, layerId) === false && allSublayersVisibility(map, layerId, true)) {
            getSublayer(map, layerId).forEach((layer) => this.props.setVisibility(layer));
        }
    }

    render() {
        return (
            <div>
                <div className='legend-group'>
                    <h5 className='legend-group__heading'><b>{this.props.map.layerData[this.props.layerId]['name']}</b></h5>
                    <img
                        onClick={this.handleClick}
                        src={this.props.map.layerData[this.props.layerId]['visibility'] ? '/img/visible.png' : '/img/invisible.png' }/>
                </div>
                <div>
                    {
                        this.props.subLayers.map((subLayer) => <LegendLayer key={subLayer} layerId={subLayer} />)
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVisibility: (id) => dispatch(setVisibility(id))
    }
};

const mapStateToProps = state => {
    return { map: state.map }
};

export default connect(mapStateToProps, mapDispatchToProps)(LegendGroup);