import React from 'react';
import { Link } from 'react-router';
import { FormattedRelative } from 'react-intl';
import LabelTicketStatus from 'app/components/admin/LabelTicketStatus';
const TicketListRow = ({ ticket }) => {
  let user = {
    id: 0,
    fullName: "N/A"
  };
  let shop = {
    id: 0,
    name: "N/A"
  }

  if(ticket.user) {
    user = ticket.user;
  }

  if(ticket.shop) {
    shop = ticket.shop;
  }

  return(
    <tr>
      <td>{ticket.id}</td>
      <td>
        <Link to={`/admin/users/${user.id}/edit`}>{user.fullName}</Link>
      </td>
      <td>
        <Link to={`/admin/shops/${shop.id}/edit`}>{shop.name}</Link>
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
