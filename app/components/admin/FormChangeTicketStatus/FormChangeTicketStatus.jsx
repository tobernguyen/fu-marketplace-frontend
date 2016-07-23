import React, { Component } from 'react';
import UserInformationSection from './UserInformationSection.jsx';
import ShopInformationSection from './ShopInformationSection.jsx';
import OrderInformationSection from './OrderInformationSection.jsx';
import RelatedInformationSection from './RelatedInformationSection.jsx';

class FormChangeTicketStatus extends Component {
  render() {
    const { adminGetUser, adminGetShop, ticket} = this.props
    return (
      <div>
        <UserInformationSection
          adminGetUser={adminGetUser}
          isFetching={ticket.isFetchingUser}
          selectedUser={ticket.selectedUser}
          selectedUserId={ticket.selectedTicket.order.userId}
        />
        <hr />
        <ShopInformationSection
          adminGetShop={adminGetShop}
          isFetching={ticket.isFetchingShop}
          selectedShop={ticket.selectedShop}
          selectedShopId={ticket.selectedTicket.order.shopId}
        />
        <hr />
        <OrderInformationSection
          orderId={ticket.selectedTicket.orderId}
          order={ticket.selectedTicket.order}
        />
        <hr />
        <RelatedInformationSection
          ticket={ticket.selectedTicket}
        />
        <hr />
      </div>
    );
  }
}

export default FormChangeTicketStatus;
