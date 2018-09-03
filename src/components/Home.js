import React from 'react';

import EsriMap from './EsriMap';
import Header from './Header';

class Home extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      const title = 'Map';
      return (
        <div>
          <Header title={title} />
          <div className='container'>
            <EsriMap className='esri-map' />
          </div>
      </div>
      );
    }
  }
  
  export default Home;