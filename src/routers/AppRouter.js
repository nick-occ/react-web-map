import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Home from '../components/Home';

export const history = createHistory();
const AppRouter = () => (
  <Router history={history}>
    <Route path="/" component={Home} />
  </Router>
);

export default AppRouter;
