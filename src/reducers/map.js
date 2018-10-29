import {formatSearchGraphics, getMapUrl} from '../selectors/map'

const mapReducerDefaultState = {
    mapView: null,
    config: {},
    layerData: {},
    searchResults: [],
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
      case 'GRAPHICS':
          const setGraphicsState = Object.assign({}, state);
          setGraphicsState.mapView.map['allLayers'].items.forEach((item) => {
              if(item['id'] === action.graphicsLayer) {
                  item.removeAll();
                  item.addMany(action.results)
              }
          });
          return setGraphicsState;
      case 'CLEAR_GRAPHICS':
          const clearGraphicsState = Object.assign({}, state);
          clearGraphicsState.mapView.map['allLayers'].items.forEach((item) => {
              if(item['id'] === action.graphicsLayer) {
                  item.removeAll();
              }
          });
          return clearGraphicsState;
      case 'SET_CENTER':
          const setCenterState = Object.assign({}, state);
          setCenterState.mapView.center = action.coords;
          if(action.zoom > -1) {
               setCenterState.mapView.zoom = action.zoom;
          }
          return setCenterState;
      case 'LAYER_DATA':
          return {...state, layerData: action.layerData};
      default:
          return state;
  }
};
