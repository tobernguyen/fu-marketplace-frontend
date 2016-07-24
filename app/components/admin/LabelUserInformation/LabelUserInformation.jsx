import React from 'react';
import { Link } from 'react-router';
const LabelUserInformation = ({ user }) => {
  const divStyle = {
    display: 'inline'
  };
  const avatarStyle= {
    height: '24px',
    width: '24px'
  };
  return (
    <span style={divStyle}>
      <img src={user.avatar} style={avatarStyle} className="img-circle"/>{' '}
      <span><Link to={`/admin/users/${user.id}/edit`}>{user.fullName}</Link></span>
    </span>
  )
}

export default LabelUserInformation;
