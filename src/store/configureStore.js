import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import mapReducer from '../reducers/map';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
export default () => {
    const store = createStore(
        combineReducers({
            map: mapReducer
        }),
        composeEnhancers()
    );
    return store;
}