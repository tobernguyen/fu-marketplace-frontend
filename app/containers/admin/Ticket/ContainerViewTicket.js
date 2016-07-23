import React, { Component } from 'react';
import FormChangeTicketStatus from 'app/components/admin/FormChangeTicketStatus';
import { connect } from 'react-redux';
import {
  adminGetTicket
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
    const { ticket, adminGetUser, adminGetShop } = this.props;
    if(ticket.isFetching) {
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
  adminGetShop
})(ContainerViewTicket);
