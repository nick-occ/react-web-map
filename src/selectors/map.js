export const getSublayer = (state, id) => {
    return Object.keys(state.layerData).filter((layer) => state.layerData[layer]['parentLayerId'] === parseInt(id));
};

export const allSublayersVisibility = (state, id, visible) => {
  const visibleLayers = getSublayer(state, id).reduce((acc, nv) => {
      if (getLayerVisibility(state, nv) === visible) {
          acc++
      }
      return acc
  }, 0);
  return getSublayer(state, id).length === visibleLayers;
};

export const getParentLayer = (state, id) =>  state.layerData[id]['parentLayerId'];

export const getParentLayers = (state) => {
    return Object.keys(state.layerData).filter((layer) => {
        return state.layerData[layer]['parentLayerId'] === -1 && state.layerData[layer]['subLayerIds'] !== null
    })
};

export const getNoParentLayers = (state) => {
    return Object.keys(state.layerData).filter((layer) => {
        return state.layerData[layer]['parentLayerId'] === -1 && state.layerData[layer]['subLayerIds'] === null
    })
};

export const isGroupLayer = (state, id) => {
    return state.layerData[id]['parentLayerId'] === -1 && state.layerData[id]['subLayerIds'] !== null
};

export const getLayerData = (state) => state.layerData;

export const getLayerVisibility = (state, id) => state.layerData[id]['visibility'];

export const getVisibleLayers = (state) => Object.keys(state.layerData).filter((layer) => state.layerData[layer]['visibility'] === true);

export const getMapUrl = (state) => `${state.config['mapUrl']}/${state.config['mapService']}`;

export const getMapView = (state) => state.mapView;

export const getToken = (state) => state.token;

export const getConfig = (state) => state.config;

export const getSearchResults = (state) => state.searchResults;