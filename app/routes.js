import React from 'react';
import {
  Route,
  IndexRoute,
  IndexRedirect
} from 'react-router';
import App from './containers/App';
import Home from './containers/home';
import Account from './containers/home/Account';
import UpdateShop from './containers/home/SellerDashboard/UpdateShop';
import AddShopItem from './containers/home/SellerDashboard/ManageShopItem/AddShopItem';
import Shop from './containers/home/Shop';
import Admin from './containers/admin';
import RequestCreateShop from './containers/home/RequestCreateShop';
import SellerDashboard from './containers/home/SellerDashboard';
import Dashboard from './containers/admin/Dashboard';
import RequestManagement from './containers/admin/RequestManagement';
import ContainerListRequest from './containers/admin/Request/ContainerListRequest';
import ContainerViewRequest from './containers/admin/Request/ContainerViewRequest';
import UserManagement from './containers/admin/UserManagement';
import ContainerListUser from './containers/admin/User/ContainerListUser';
import ContainerEditUser from './containers/admin/User/ContainerEditUser';
import ShopManagement from './containers/admin/ShopManagement';
import ContainerListShop from './containers/admin/Shop/ContainerListShop';
import ContainerEditShop from './containers/admin/Shop/ContainerEditShop';
import ChangePassword from './containers/admin/ChangePassword';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}>
      <Route path="account" component={Account} />
      <Route path="shops/request_create" component={RequestCreateShop} />
      <Route path="shops/:shopID" component={Shop} />
      <Route path="shops/:shopID/dashboard" component={SellerDashboard}>
        <Route path="info" component={UpdateShop} />
        <Route path="items/add" component={AddShopItem} />
      </Route>
    </Route>

    <Route name="admin" path="admin" component={Admin}>
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={Dashboard} />
      <Route path="requests" component={RequestManagement}>
        <IndexRoute component={ContainerListRequest} />
        <Route path=":requestId/view" component={ContainerViewRequest} />
      </Route>
      <Route path="users" component={UserManagement} >
        <IndexRoute component={ContainerListUser} />
        <Route path=":userId/edit" component={ContainerEditUser} />
      </Route>
      <Route path="shops" component={ShopManagement} >
        <IndexRoute component={ContainerListShop} />
        <Route path=":shopId/edit" component={ContainerEditShop} />
      </Route>
      <Route path="changepwd" component={ChangePassword} />
    </Route>
  </Route>
)
