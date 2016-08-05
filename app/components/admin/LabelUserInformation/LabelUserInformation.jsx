import React from 'react';
import { Link } from 'react-router';
const LabelUserInformation = ({ user }) => {
  let fullName = '';
  let avatar = '';
  if(user) {
    fullName = user.fullName;
    avatar= user.avatar;
  }
  const divStyle = {
    display: 'inline'
  };
  const avatarStyle= {
    height: '24px',
    width: '24px'
  };
  return (
    <span style={divStyle}>
      <img src={avatar} style={avatarStyle} className="img-circle"/>{' '}
      <span><Link to={`/admin/users/${user.id}/edit`}>{fullName}</Link></span>
    </span>
  )
}

export default LabelUserInformation;
