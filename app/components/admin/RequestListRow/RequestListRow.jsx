import React from 'react';
import { Link } from 'react-router';
import LabelRequestStatus from 'app/components/admin/LabelRequestStatus';
const RequestListRow = ({ request }) => {
  return (
    <tr>
      <td>{request.id}</td>
      <td>{request.name}</td>
      <td>
        <Link to={`/admin/users/${request.seller.id}/edit`}>
          {request.seller.fullName}
        </Link>
      </td>
      <td>
        <LabelRequestStatus status={request.status}/>
      </td>
      <td className="actions">
        <Link to={`/admin/requests/${request.id}/view`} className="btn btn-warning">
          <i className="fa fa-eye"></i>
        </Link>
      </td>
    </tr>
  );
}

export default RequestListRow;
