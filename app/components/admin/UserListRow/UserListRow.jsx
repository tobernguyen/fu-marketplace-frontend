import React from 'react';
import { Link } from 'react-router';
import './UserListRow.scss';
import LabelUserRole from 'app/components/admin/LabelUserRole';
import classNames from 'classnames'
const UserListRow = ({ user }) => {
  const rowClassName = classNames({
    'banned': user.banned
  })
  let roleIndex = 0;
  return (
    <tr className={rowClassName}>
        <td>
          {user.id || 'N/A'}
        </td>
        <td>
          {user.email || 'N/A'}
        </td>
        <td>
          {user.fullName || 'N/A'}
        </td>
        <td>
          {user.roles.map(role =>
            <LabelUserRole key={++roleIndex} role={role}/>
          )}
          {
            user.roles.length === 0 &&
            <LabelUserRole />
          }
        </td>
        <td className="actions">
          <Link className="btn btn-warning" to={`/admin/users/${user.id}/edit`} bsStyle="warning">
            <i className="fa fa-pencil-square-o"></i>
          </Link>
        </td>
    </tr>
  );
}

export default UserListRow;
