import React from 'react';

const LabelCustomerInformation = ({ buyer }) => {
  const divStyle = {
    display: 'inline'
  };
  const avatarStyle= {
    height: '24px',
    width: '24px',
  };
  return (
    <div style={divStyle}>
      <img src={buyer.avatar} className="img-circle" style={avatarStyle}/>{' '}
      <span>{buyer.fullName}</span>
    </div>
  )
}

export default LabelCustomerInformation;
