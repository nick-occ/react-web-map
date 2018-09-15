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
        <div>
          <Header title={title} />
          <div className='container'>
            <SidePanel />
            <EsriMap className='esri-map' />
          </div>
      </div>
      );
    }
  }
  
  export default Home;