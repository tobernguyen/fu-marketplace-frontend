import React from 'react';
import { Link } from 'react-router';
import LabelRequestStatus from 'app/components/admin/LabelRequestStatus';
import { browserHistory } from 'react-router';
const RequestListRow = ({ request, adminSelectRequest }) => {
  let seller = {
    id: 0,
    fullName: "N/A"
  };

  if(request.seller) {
    seller = request.seller;
  }
  return (
    <tr>
      <td>{request.id}</td>
      <td>{request.name}</td>
      <td>
        <Link to={`/admin/users/${seller.id}/edit`}>
          {seller.fullName}
        </Link>
      </td>
      <td>
        <LabelRequestStatus status={request.status}/>
      </td>
      <td className="actions">
        <Link to={`/admin/requests/${request.id}/view`} className="btn btn-warning" onClick={(e) => {
          e.preventDefault();
          adminSelectRequest(request);
          browserHistory.push(`/admin/requests/${request.id}/view`);
        }}>
          <i className="fa fa-eye"></i>
        </Link>
      </td>
    </tr>
  );
}

export default RequestListRow;
