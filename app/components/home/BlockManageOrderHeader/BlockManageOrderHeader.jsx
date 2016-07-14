import React from 'react';
import './BlockManageOrderHeader.scss';
import classNames  from 'classnames';

const BlockManageOrderHeader = ({ isCurrent = true, changeOrderListDisplay}) => {
  return (
    <div className="manage-order-header clearfix">
      <h4 className="title">Order Management</h4>
      <div className="btn-group switch-mode pull-right">
        <button className={classNames('btn', { 'active': isCurrent })} onClick={() => changeOrderListDisplay(true)}>
          Current
        </button>
        <button className={classNames('btn', { 'active': !isCurrent })} onClick={() => changeOrderListDisplay(false)}>
          All
        </button>
      </div>
    </div>
  );
};

export default BlockManageOrderHeader;
