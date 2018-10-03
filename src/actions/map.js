import { SET_MAP_PROPS, SET_VISIBILITY } from '../constants/action-types';

// SET_MAP_PROPS
export const setMapProps = (map) => ({ type: SET_MAP_PROPS , map });

// SET_VISIBILITY
export const setVisibility = (id) => ({ type: SET_VISIBILITY, id});