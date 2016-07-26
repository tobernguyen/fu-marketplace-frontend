import React, { Component } from 'react';
import UserInformationSection from './UserInformationSection.jsx';
import ShopInformationSection from './ShopInformationSection.jsx';
import OrderInformationSection from './OrderInformationSection.jsx';
import RelatedInformationSection from './RelatedInformationSection.jsx';
import ResponseSection from './ResponseSection.jsx';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class FormChangeTicketStatus extends Component {
  render() {
    const { adminGetUser, adminGetShop, adminInvestigateTicket, adminCloseTicket, ticket} = this.props
    let userId = '';
    let shopId = '';
    if(ticket.selectedTicket.order) {
      userId = ticket.selectedTicket.order.userId;
      shopId = ticket.selectedTicket.order.shopId;

      return (
        <div>
          <UserInformationSection
            adminGetUser={adminGetUser}
            isFetching={ticket.isFetchingUser}
            selectedUser={ticket.selectedUser}
            selectedUserId={userId}
          />
          <hr />
          <ShopInformationSection
            adminGetShop={adminGetShop}
            isFetching={ticket.isFetchingShop}
            selectedShop={ticket.selectedShop}
            selectedShopId={shopId}
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
          <ResponseSection
            ticket={ticket}
            adminInvestigateTicket={adminInvestigateTicket}
            adminCloseTicket={adminCloseTicket}
            isSubmitting={this.props.isSubmitting}
            submitResult={this.props.submitResult}
          />
        </div>
      );
    }

    return <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
  }
}

export default FormChangeTicketStatus;
