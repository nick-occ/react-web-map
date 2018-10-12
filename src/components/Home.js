import React from 'react';

import EsriMap from './EsriMap';
import EsriMap1 from './EsriMap1';
import Header from './Header';
import Legend from './Legend';
import SidePanel from './SidePanel';

import {getToken, getConfig} from '../actions/map';
import { getMapName, getSearchResults } from '../selectors/map';
import connect from "react-redux/es/connect/connect";

class Home extends React.Component {

    constructor() {
      super();
    }

    componentDidMount() {
        this.props.getToken();
        this.props.getConfig();
    }
  
    render() {
      return (
          <div id='main-frame'>
              <Header
                  title={getMapName(this.props.map)}
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
        getToken: () => dispatch(getToken()),
        getConfig: () => dispatch(getConfig())
    };
};

const mapStateToProps = state => {
    return { map: state.map };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);