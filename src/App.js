import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import { createStore } from 'redux';
import AppRouter from './routers/AppRouter';
import Home from './components/Home';
import mapReducer from './reducers/map';

import configureStore from './store/configureStore';


import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <Home />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

renderApp();

