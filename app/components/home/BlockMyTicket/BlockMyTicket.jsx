import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/BlockMyTicket/BlockMyTicket.i18n.js';
import BlockMyTicketRow from './BlockMyTicketRow.jsx';
import BlockMyTicketFooter from './BlockMyTicketFooter.jsx';

import './BlockMyTicket.scss';

class BlockMyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedTicket: {}
    }
  }
  renderTicketList(tickets) {
    return(
      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th><FormattedMessage {...messages.blockMyTicket.table.header.orderId} /></th>
            <th><FormattedMessage {...messages.blockMyTicket.table.header.shop}/></th>
            <th><FormattedMessage {...messages.blockMyTicket.table.header.status}/></th>
            <th><FormattedMessage {...messages.blockMyTicket.table.header.createdAt}/></th>
            <th><FormattedMessage {...messages.blockMyTicket.table.header.updatedAt}/></th>
            <th><FormattedMessage {...messages.blockMyTicket.table.header.action}/></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket =>
            <BlockMyTicketRow
              key={ticket.id}
              ticket={ticket}
            />
          )}
        </tbody>
      </table>
    );
  }
  render() {
      const {tickets, page, changePageSize, size, prevPage, nextPage } = this.props;
    return (
      <div>
        {this.renderTicketList(tickets)}
        <BlockMyTicketFooter
          page={page}
          tickets={tickets}
          size={size}
          prevPage={prevPage}
          nextPage={nextPage}
          changePageSize={changePageSize}
        />
      </div>
    );
  }
}

export default BlockMyTicket;
