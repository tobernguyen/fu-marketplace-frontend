import React from 'react';

const LabelCustomerInformation = ({ buyer }) => {
  let fullName = '';
  let avatar = '';
  if(buyer) {
    fullName = buyer.fullName;
    avatar = buyer.avatar
  }
  const divStyle = {
    display: 'inline'
  };
  const avatarStyle= {
    height: '24px',
    width: '24px'
  };
  return (
    <div style={divStyle}>
      <img src={avatar} className="img-circle" style={avatarStyle}/>{' '}
      <span>{fullName}</span>
    </div>
  )
}

export default LabelCustomerInformation;
