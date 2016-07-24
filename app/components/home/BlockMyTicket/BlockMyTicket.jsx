import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/BlockMyTicket/BlockMyTicket.i18n.js';
import BlockMyTicketRow from './BlockMyTicketRow.jsx';
import BlockMyTicketFooter from './BlockMyTicketFooter.jsx';
import ModalViewTicket from './ModalViewTicket.jsx';
import TicketStatus from 'app/shared/ticketStatus';
import AsyncResultCode from 'app/shared/asyncResultCodes';

import './BlockMyTicket.scss';

class BlockMyTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedTicket: {}
    }

    this.openViewTicketModal = (selectedTicket) => {
      this.setState({
        showModal: true,
        selectedTicket
      });
    }

    this.closeViewTicketModal = () => {
      this.setState({
        showModal: false
      });
      this.props.userCloseTicketModal();
    }

    this.reopen = () => {
      const { selectedTicket } = this.state;
      this.props.userReopenTicket(selectedTicket.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { submitResult } = nextProps;
    if(submitResult == AsyncResultCode.REOPEN_TICKET_SUCCESS ) {
      const { selectedTicket } = this.state;
      selectedTicket['status'] = TicketStatus.OPENING
      this.setState({
        selectedTicket
      });
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
              openViewTicketModal={this.openViewTicketModal}
            />
          )}
        </tbody>
      </table>
    );
  }
  render() {
      const {tickets, page, changePageSize, size, prevPage, nextPage, isSubmitting, submitResult } = this.props;
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
        <ModalViewTicket
          showModal={this.state.showModal}
          closeModal={this.closeViewTicketModal}
          ticket={this.state.selectedTicket}
          reopen={this.reopen}
          isSubmitting={isSubmitting}
          submitResult={submitResult}
        />
      </div>
    );
  }
}

export default BlockMyTicket;
