import React from 'react';

import EsriMap from './EsriMap';
import SidePanel from './SidePanel';
import Header from './Header';

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
              </div>
          </div>
      );
    }
  }
  
  export default Home;