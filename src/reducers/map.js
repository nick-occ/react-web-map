const mapReducerDefaultState = {
    name: '',
    mapView: null,
    map: null,
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
          let layerData = state.layerData[action.id];
          let mapView = state.mapView;
          let visible = layerData.visibility;
          mapView.map.layers.items[0].allSublayers.items.forEach((item) => {
              if (item.id === parseInt(action.id)) {
                  item.visible = !visible;
              }
          });

          layerData.visibility = !visible;
          return {
              ...state
          };
      default:
          return state
  }
};
