import React from 'react';
import LabelTicketStatus from 'app/components/admin/LabelTicketStatus'
import { FormattedRelative, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { messages } from 'app/components/home/BlockMyTicket/BlockMyTicket.i18n.js';

const BlockMyTicketRow = ({ ticket }) => {
  return (
    <tr>
      <td>{ticket.id}</td>
      <td>{ticket.order.id}</td>
      <td><Link to={`/shops/${ticket.shop.id}`}>{ticket.shop.name}</Link></td>
      <td><LabelTicketStatus status={ticket.status}/></td>
      <td><FormattedRelative value={new Date(ticket.createdAt)}/></td>
      <td><FormattedRelative value={new Date(ticket.updatedAt)}/></td>
      <td>
        <button className="btn order-status btn-warning" type="button" onClick={() => console.log('Display modal!')}>
          <FormattedMessage {...messages.blockMyTicket.table.row.button}/>
        </button>
      </td>
    </tr>
  )
}

export default BlockMyTicketRow;
