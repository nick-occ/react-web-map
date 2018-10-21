import {formatSearchGraphics, getMapUrl} from '../selectors/map'

const mapReducerDefaultState = {
    mapView: null,
    config: {},
    layerData: {},
    searchResults: []
};

export default (state = mapReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_MAP_PROPS':
          return {...state, ...action.map};
      case 'SET_VISIBILITY':
          const setVisibleState = Object.assign({}, state);
          const layerData = setVisibleState.layerData[action.id];
          const mapView = setVisibleState.mapView;
          const visible = layerData.visibility;

          mapView.map['layers'].items.forEach((item) => {
              if (item['url'] === getMapUrl(state)) {
                  item['allSublayers'].items.forEach((layer) => {
                      if (layer.id === parseInt(action.id)) {
                          layer.visible = !visible;
                      }
                  })
              }
          });

          layerData.visibility = !visible;
          return setVisibleState;
      case 'SET_TOKEN':
          return {...state, token: action.token};
      case 'SET_CONFIG':
          return {...state, config: action.config};
      case 'SEARCH_RESULTS':
          return {...state, searchResults: action.results};
      case 'CLEAR_SEARCH_RESULTS':
          return {...state, searchResults: []};
      case 'SEARCH_GRAPHICS':
          const setSearchState = Object.assign({}, state);
          setSearchState.mapView.map['allLayers'].items.forEach((item) => {
              if (item['id'] === 'searchGraphics') {
                  item.removeAll();
                  item.addMany(action.results);
              }
          });
          return setSearchState;
      case 'SET_CENTER':
          const setCenterState = Object.assign({}, state);
          setCenterState.mapView.center = action.coords;
          return setCenterState;
      case 'LAYER_DATA':
          return {...state, layerData: action.layerData};
      default:
          return state;
  }
};
