import { SET_MAP_PROPS, SET_VISIBILITY, SET_TOKEN, SET_CONFIG } from '../constants/action-types';
import axios from "axios";
import jwt from "jsonwebtoken";

// SET_MAP_PROPS
export const setMapProps = (map) => ({ type: SET_MAP_PROPS , map });

// SET_VISIBILITY
export const setVisibility = (id) => ({ type: SET_VISIBILITY, id});

//get ESRI token to authenticate map service
export const getToken = () => {
    return(dispatch) => {
        return axios.post('http://localhost:3000/token',{
            username: jwt.sign(process.env.ARCGIS_USER, process.env.ARCGIS_SECRET),
            password: jwt.sign(process.env.ARCGIS_PASS, process.env.ARCGIS_SECRET)
        })
            .then((res) => dispatch(setToken(res.data.token)))
            .catch((err) => console.log(err));
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
export const getConfig = () => {
    return(dispatch) => {
        return axios.get('http://localhost:3000/config')
            .then((res) => dispatch(setConfig(res.data.config)))
            .catch((err) => console.log(err));
    }
};

//set configuration from the database
export const setConfig = (config) => {
    return {
        type: SET_CONFIG,
        config
    }
};