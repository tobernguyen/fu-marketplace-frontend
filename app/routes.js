import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/home';
import Account from './containers/home/Account';
import Shop from './containers/home/Shop';
import Admin from './containers/admin';
import Dashboard from './containers/admin/Dashboard';
import UserManagement from './containers/admin/UserManagement';
import ShopManagement from './containers/admin/ShopManagement';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}>
      <Route path="account" component={Account} overlayMode={true} />
      <Route path="shops/:shopId" component={Shop} overlayMode={true} bsSize="lg"/>
    </Route>

    <Route path="/admin" component={Admin}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard} />
      <Route path="users" component={UserManagement} />
      <Route path="shops" component={ShopManagement} />
    </Route>
  </Route>
)
