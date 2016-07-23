import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  adminGetTicket
} from 'app/actions/ticket';
import TicketList from 'app/components/admin/TicketList';

class ComponentListTicket extends Component {
  componentWillMount() {
    this.props.adminGetTicket();
  }

  render() {
    const { ticket: { tickets, isFetching } } = this.props;
    return (
      <div>
        <TicketList tickets={tickets} isFetching={isFetching} />
      </div>
    );
  }
}

ComponentListTicket.path = '/ticket';
ComponentListTicket.title = 'Ticket Management';
ComponentListTicket.description = 'Ticket Management';
ComponentListTicket.faIcon = 'fa-ticket';

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket
  }
}

export default connect(mapStateToProps, {
  adminGetTicket
})(ComponentListTicket);
