import React from 'react';
import { Link } from 'react-router';
import { FormattedRelative } from 'react-intl';
import LabelTicketStatus from 'app/components/admin/LabelTicketStatus';
const TicketListRow = ({ ticket }) => {
  return(
    <tr>
      <td>{ticket.id}</td>
      <td>
        <Link to={`/admin/users/${ticket.user.id}/edit`}>{ticket.user.fullName}</Link>
      </td>
      <td>
        <Link to={`/admin/shops/${ticket.shop.id}/edit`}>{ticket.shop.name}</Link>
      </td>
      <td>
        <LabelTicketStatus status={ticket.status} />
      </td>
      <td>
        <FormattedRelative value={ticket.createdAt} />
      </td>
      <td>
        <Link to={`/admin/tickets/${ticket.id}/view`} className="btn btn-warning">
          <i className="fa fa-ticket"></i>
        </Link>
      </td>
    </tr>
  );
}

export default TicketListRow;
