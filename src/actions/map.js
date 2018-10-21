import {
    SET_MAP_PROPS,
    SET_VISIBILITY,
    SET_TOKEN,
    SET_CONFIG,
    SEARCH_GRAPHICS,
    CLEAR_SEARCH_RESULTS,
    SEARCH_RESULTS,
    SET_CENTER,
    LAYER_DATA
} from '../constants/action-types';
import axios from "axios";
import jwt from "jsonwebtoken";
import _ from 'lodash';

// SET_MAP_PROPS
export const setMapProps = (map) => ({ type: SET_MAP_PROPS , map });

// SET_VISIBILITY
export const setVisibility = (id) => ({ type: SET_VISIBILITY, id});

//get ESRI token to authenticate map service
export const handleToken = () => {
    return(dispatch) => {
        return axios.post('http://localhost:3000/token',{
            username: jwt.sign(process.env.ARCGIS_USER, process.env.ARCGIS_SECRET),
            password: jwt.sign(process.env.ARCGIS_PASS, process.env.ARCGIS_SECRET)
        })
            .then((res) => dispatch(setToken(res.data.token)))
            .catch((err) => console.error(err));
    }
};

//set ESRI token action
export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        token
    }
};

//get configuration from the database
export const handleConfig = () => {
    return(dispatch) => {
        return axios.get('http://localhost:3000/config')
            .then((res) => dispatch(setConfig(res.data.config)))
            .catch((err) => console.error(err));
    }
};

//set configuration from the database
export const setConfig = (config) => {
    return {
        type: SET_CONFIG,
        config
    }
};

export const getSearchResults = (term, longitude, latitude) => {
    return(dispatch) => {
        return axios.post('http://localhost:3000/search', {
            term,
            longitude,
            latitude
        })
            .then((res) => {
                dispatch(clearSearchGraphics());
                dispatch(setSearchResults(res.data.businesses));
            })
            .catch((err) => console.error(err));
    }
};

export const setSearchResults = (results) => {
    return {
        type: SEARCH_RESULTS,
        results
    }
};

export const clearSearchGraphics = () => {
    return {
        type: CLEAR_SEARCH_RESULTS,
    }
};

export const setSearchGraphics = (results) => {
    return {
        type: SEARCH_GRAPHICS,
        results
    }
};

export const setCenter = (coords) => {
    return {
        type: SET_CENTER,
        coords
    }
};

export const handleLayerData = (mapServiceUrl, token) => {
    const verifiedToken = jwt.verify(token, process.env.ARCGIS_SECRET);
    return(dispatch) => {
        return axios.get(mapServiceUrl, {
            params: {
                token: verifiedToken,
                f: 'json'
            }
        })
            .then((json) => {
                const layerData = {};
                json.data['layers'].forEach((layer) => {
                    layerData[layer.id] = _.pick(layer, ['id','defaultVisibility','name', 'parentLayerId', 'subLayerIds'])
                    layerData[layer.id]['visibility'] = layer['defaultVisibility'];
                });
                dispatch(setLayerData(layerData))
            })
            .catch((err) => console.error(err));
    }
};

export const setLayerData = (layerData) => {
    return {
        type: LAYER_DATA,
        layerData
    }
};