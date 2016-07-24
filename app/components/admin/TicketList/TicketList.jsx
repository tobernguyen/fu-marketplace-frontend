import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/TicketList/TicketList.i18n';
import TicketListRow from './TicketListRow.jsx';

class TicketList extends Component {
  render() {
    const { tickets } = this.props;
    return (
      <div className="container-fluid">
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.ticketList.table.header.user}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.shop}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.status}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.createdAt}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.action}/></th>
            </tr>
          </thead>
          <tbody>
          {tickets.map(ticket =>
            <TicketListRow ticket={ticket} key={ticket.id}/>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TicketList;
