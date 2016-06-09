import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/home';
import Account from './containers/home/Account';
import Shop from './containers/home/Shop';
import Admin from './containers/admin';
import RequestCreateShop from './containers/home/RequestCreateShop';
import SellerDashboard from './containers/home/SellerDashboard';
import Dashboard from './containers/admin/Dashboard';
import UserManagement from './containers/admin/UserManagement';
import ShopManagement from './containers/admin/ShopManagement';
import ChangePassword from './containers/admin/ChangePassword';
import EditUser from './containers/admin/EditUser';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}>
      <Route path="account" component={Account} />
      <Route path="shops/request_create" component={RequestCreateShop} />
      <Route path="shops/:shopId" component={Shop} />
      <Route path="seller/dashboard" component={SellerDashboard} />
    </Route>

    <Route path="/admin" component={Admin}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard} />
      <Route path="users" component={UserManagement} />
      <Route path="users/:userId/edit" component={EditUser} />
      <Route path="shops" component={ShopManagement} />
      <Route path="changepwd" component={ChangePassword} />
    </Route>
  </Route>
)
