export const getSublayer = (state, id) => {
    return Object.keys(state.layerData).filter((layer) => state.layerData[layer]['parentLayerId'] === parseInt(id));
};

export const getParentLayer = (state, id) =>  state.layerData[id]['parentLayerId'];

export const getLayerVisibility = (state, id) => state.layerData[id]['visibility'];

export const getMapUrl = (state) => `${state.config['mapUrl']}/${state.config['mapService']}`;

export const getMapView = (state) => state.mapView;