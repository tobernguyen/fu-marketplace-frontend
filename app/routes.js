import React from 'react';
import {
  Route,
  IndexRoute,
  IndexRedirect
} from 'react-router';
import { displayAsModal } from './containers/home/ModalComponent';
import App from './containers/App';
import Home from './containers/home';
import Wrapper from './containers/home/Wrapper';
import WrapperDashboard from './containers/home/WrapperDashboard';
import Account from './containers/home/Account';
import MyOrders from './containers/home/MyOrders';
import MyTickets from './containers/home/MyTickets';
import UpdateShop from './containers/home/SellerDashboard/UpdateShop';
import UpdateShipPlaces from './containers/home/SellerDashboard/UpdateShipPlaces';
import AddShopItem from './containers/home/SellerDashboard/ManageShopItem/AddShopItem';
import UpdateShopItem from './containers/home/SellerDashboard/ManageShopItem/UpdateShopItem';
import ManageOrders from './containers/home/SellerDashboard/ManageOrders';
import Statistics from './containers/home/SellerDashboard/Statistics';
import Shop from './containers/home/Shop';
import ShopReviews from './containers/home/ShopReviews';
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
import PromotionCampaignManagement from './containers/admin/PromotionCampaignManagement';
import ContainerListPromotion from './containers/admin/Promotion/ContainerListPromotion';
import ContainerEditPromotion from './containers/admin/Promotion/ContainerEditPromotion';
import TicketManagement from './containers/admin/TicketManagement';
import ContainerListTicket from './containers/admin/Ticket/ContainerListTicket';
import ContainerViewTicket from './containers/admin/Ticket/ContainerViewTicket';
import ChangePassword from './containers/admin/ChangePassword';


export default (
  <Route component={App}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}>
      <IndexRoute component={Wrapper}/>
      <Route component={Wrapper}>
        <Route path="account" component={displayAsModal(Account)} />
        <Route path="orders" component={displayAsModal(MyOrders)} />
        <Route path="tickets" component={displayAsModal(MyTickets)} />
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
        <Route path="shops/:shopID/statistics" component={Statistics} />
        <Route path="shops/:shopID/orders" component={ManageOrders} />
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
      <Route path="promotions" component={PromotionCampaignManagement} >
        <IndexRoute component={ContainerListPromotion} />
        <Route path=":promotionId/edit" component={ContainerEditPromotion} />
      </Route>
      <Route path="tickets" component={TicketManagement}>
        <IndexRoute component={ContainerListTicket} />
        <Route path=":ticketId/view" component={ContainerViewTicket} />
      </Route>
      <Route path="changepwd" component={ChangePassword} />
    </Route>
  </Route>
)
