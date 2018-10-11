const mapReducerDefaultState = {
    name: '',
    mapView: null,
    idLayer: 'Identify',
    idCurRec: 0,
    idTotalRec: 0,
    idData: [],
    idParams: null,
    idTask: null,
    layerData: {}
};

export default (state = mapReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_MAP_PROPS':
          return {...state, ...action.map};
      case 'SET_VISIBILITY':
          const newState = Object.assign({}, state);
          const layerData = newState.layerData[action.id];
          const mapView = newState.mapView;
          const visible = layerData.visibility;
          mapView.map.layers.items[0].allSublayers.items.forEach((item) => {
              if (item.id === parseInt(action.id)) {
                  item.visible = !visible;
              }
          });

          layerData.visibility = !visible;
          return newState;
      case 'SET_TOKEN':
          return {...state, token: action.token};
      case 'SET_CONFIG':
          return {...state, config: action.config};
      default:
          return state
  }
};
