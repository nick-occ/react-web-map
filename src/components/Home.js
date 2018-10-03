import React from 'react';

import EsriMap from './EsriMap';
import Header from './Header';
import Legend from './Legend';
import SidePanel from './SidePanel';

class Home extends React.Component {

    constructor(props) {
      super();
    }
  
    render() {
      const title = 'Map';
      return (
          <div id='main-frame'>
              <Header title={title}/>
              <div id={'map-frame'}>
                  <EsriMap/>
                  <SidePanel/>
                  <Legend/>
              </div>
          </div>
      );
    }
  }
  
  export default Home;