import React from 'react';
import './BlockManageOrderHeader.scss';
import classNames  from 'classnames';

const BlockManageOrderHeader = ({ isCurrent = true, changeOrderListDisplay}) => {
  const currentBtnClass = classNames({
    'btn': true,
    'active': isCurrent
  });
  const allBtnClass = classNames({
    'btn': true,
    'active': !isCurrent
  });

  return (
    <div className="manage-order-header">
      <h4>Order Management</h4>
      <div className="btn-group">
        <button className={currentBtnClass} onClick={() => changeOrderListDisplay(true)}>
          Current
        </button>
        <button className={allBtnClass} onClick={() => changeOrderListDisplay(false)}>
          All
        </button>
      </div>
    </div>
  );
}

export default BlockManageOrderHeader;
