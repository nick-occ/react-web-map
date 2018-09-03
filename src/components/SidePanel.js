import React from 'react';

import Locations from './Locations'

export default class SidePanel extends React.Component{
  state = {
    locations: [{
      name: 'Student Union',
      description: 'Where students hangout.',
      image: '/img/50x50.png'
    },
    {
      name: 'Union Deck',
      description: 'Where to park.',
      image: '/img/50x50.png'
    },
    {
      name: 'Jerry Richardson Stadium',
      description: 'Where they play football.',
      image: '/img/50x50.png'
    }
  ],
    selectedLocation: undefined
  };

  render() {
    return (
      <div className='side-panel-section'>
        <Locations locations={this.state.locations} />
      </div>
    );
  }
}
