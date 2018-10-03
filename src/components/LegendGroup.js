import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setVisibility } from '../actions/map';
import LegendLayer from './LegendLayer';

export class LegendGroup extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.setVisibility(this.props['layerId']);
    }

    render() {
        return (
            <div>
                <div className='legend-item'>
                    <h5 className='legend-item__heading'><b>{this.props.map.layerData[this.props.layerId]['name']}</b></h5>
                    <img
                        onClick={this.handleClick}
                        src={this.props.map.layerData[this.props.layerId]['visibility'] ? '/img/visible.png' : '/img/invisible.png' }/>
                </div>
                <div>
                    <ul>
                        {
                            this.props.subLayers.map((subLayer) => <LegendLayer key={subLayer} layerId={subLayer} />)
                        }
                    </ul>
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

