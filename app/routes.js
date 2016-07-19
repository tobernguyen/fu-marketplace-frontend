import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';
import { displayAsModal } from './containers/home/ModalComponent';
import App from './containers/App';
import Home from './containers/home';
import Wrapper from './containers/home/Wrapper';
import WrapperDashboard from './containers/home/WrapperDashboard';
import Account from './containers/home/Account';
import MyOrders from './containers/home/MyOrders';
import UpdateShop from './containers/home/SellerDashboard/UpdateShop';
import UpdateShipPlaces from './containers/home/SellerDashboard/UpdateShipPlaces';
import AddShopItem from './containers/home/SellerDashboard/ManageShopItem/AddShopItem';
import UpdateShopItem from './containers/home/SellerDashboard/ManageShopItem/UpdateShopItem';
import ManageOrders from './containers/home/SellerDashboard/ManageOrders';
import Shop from './containers/home/Shop';
import ShopReviews from './containers/home/ShopReviews';
import RequestCreateShop from './containers/home/RequestCreateShop';
import SellerDashboard from './containers/home/SellerDashboard';


export default (
  <Route component={App}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}>
      <IndexRoute component={Wrapper}/>
      <Route component={Wrapper}>
        <Route path="account" component={displayAsModal(Account)} />
        <Route path="orders" component={displayAsModal(MyOrders)} />
        <Route path="shops/request_create" component={displayAsModal(RequestCreateShop)} />
        <Route path="shops/:shopID" component={displayAsModal(Shop)}>
          <Route path="reviews" component={ShopReviews} />
        </Route>
      </Route>

      <Route path="/dashboard" component={WrapperDashboard}>
        <Route path="shops/:shopID" component={SellerDashboard}>
          <Route path="info" component={UpdateShop} />
          <Route path="ship_places" component={UpdateShipPlaces} />
          <Route path="items/add" component={AddShopItem} />
          <Route path="items/:itemID/update" component={UpdateShopItem} />
        </Route>
      </Route>

      <Route path="/dashboard/shops/:shopID/orders" component={ManageOrders} />
    </Route>
  </Route>
)
