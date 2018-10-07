import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setVisibility } from '../actions/map';
import { getParentLayer, getLayerVisibility } from '../selectors/map';

export class LegendLayer extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {layerId, map} = this.props;
        const parentId = getParentLayer(map, layerId);
        this.props.setVisibility(layerId);

        if (getLayerVisibility(map, layerId) && getLayerVisibility(map, parentId) === false) {
            this.props.setVisibility(parentId);
        }
    }

    render() {
        return (

                <div className='legend-item'>
                    <p className={'legend-item__heading'}>{this.props.map.layerData[this.props.layerId]['name']}</p>
                    <img
                        onClick={this.handleClick}
                        src={this.props.map.layerData[this.props.layerId]['visibility'] ? '/img/visible.png' : '/img/invisible.png' }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LegendLayer);

