import React, { Component } from 'react';
import FormChangeTicketStatus from 'app/components/admin/FormChangeTicketStatus';
import { connect } from 'react-redux';
import {
  adminGetTicket,
  adminInvestigateTicket,
  adminCloseTicket
} from 'app/actions/ticket';
import {
  adminGetUser,
  adminGetShop
} from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';


class ContainerViewTicket extends Component {
  componentWillMount() {
    const { ticketId } = this.props.params;
    this.props.adminGetTicket(ticketId);
  }
  render() {
    const { ticket, adminGetUser, adminGetShop, adminInvestigateTicket, adminCloseTicket } = this.props;
    if(ticket.isFetching || ticket.isSubmitting) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    }
    return(
      <div className="container-fluid">
        <FormChangeTicketStatus
          ticket={ticket}
          adminGetUser={adminGetUser}
          adminGetShop={adminGetShop}
          adminInvestigateTicket={adminInvestigateTicket}
          adminCloseTicket={adminCloseTicket}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket
  }
}

export default connect(mapStateToProps, {
  adminGetTicket,
  adminGetUser,
  adminGetShop,
  adminInvestigateTicket,
  adminCloseTicket
})(ContainerViewTicket);
