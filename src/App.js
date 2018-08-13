import React from 'react';
import EsriMap from './components/EsriMap';
import Header from './components/Header';

class App extends React.Component {
  render() {
    const title = 'Map';
    return (
      <div className='box'>
        <Header title={title} />
        <div className='container'>
          <EsriMap className="esri-map" />
        </div>
      </div>
    );
  }
}

export default App;
