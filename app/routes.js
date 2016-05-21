import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/home';
import Admin from './containers/admin';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/admin" >
      <IndexRoute component={Admin} />
    </Route>
  </Route>
)
