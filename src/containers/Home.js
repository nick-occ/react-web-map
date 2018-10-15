import React , {Component} from 'react';
import { connect } from 'react-redux';

import EsriMap1 from './EsriMap1';
import Header from '../components/Header';
import Legend from './Legend';
import SidePanel from '../components/SidePanel';

import {handleToken, handleConfig, handleLayerData} from '../actions/map';
import { getConfig, getSearchResults, getToken, getMapUrl} from '../selectors/map';

class Home extends Component {

    constructor() {
      super();
    }

    componentDidMount() {
        this.props.handleToken();
        this.props.handleConfig();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.map.token !== getToken(this.props.map)) {
            this.props.handleLayerData(getMapUrl(this.props.map),  getToken(this.props.map));
        }
    }
  
    render() {
      return (
          <div id='main-frame'>
              <Header
                  title={getConfig(this.props.map)['name']}
              />
              <div id={'map-frame'}>
                  <EsriMap1/>
                  {/*<EsriMap/>*/}
                  <SidePanel
                      searchResults={getSearchResults(this.props.map)}
                  />
                  <Legend/>
              </div>
          </div>
      );
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        handleToken: () => dispatch(handleToken()),
        handleConfig: () => dispatch(handleConfig()),
        handleLayerData: (mapUrl, token) => dispatch(handleLayerData(mapUrl, token))
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);