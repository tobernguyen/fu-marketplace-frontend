import React from 'react';
import './BlockManageOrderHeader.scss';
import classNames  from 'classnames';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/BlockManageOrderHeader/BlockManageOrderHeader.i18n';

const BlockManageOrderHeader = ({ isCurrent = true, changeOrderListDisplay, sellerShop}) => {
  return (
    <div className="manage-order-header clearfix">
      <h4 className="title">
        <FormattedMessage {...messages.blockManageOrderHeader.name} />
        <p className="shop-name">
          {sellerShop.name}
        </p>
      </h4>
      <div className="btn-group switch-mode pull-right">
        <button className={classNames('btn', { 'active': isCurrent })} onClick={() => changeOrderListDisplay(true)}>
          <FormattedMessage {...messages.blockManageOrderHeader.button.current} />
        </button>
        <button className={classNames('btn', { 'active': !isCurrent })} onClick={() => changeOrderListDisplay(false)}>
          <FormattedMessage {...messages.blockManageOrderHeader.button.all}/>
        </button>
      </div>
    </div>
  );
};

export default BlockManageOrderHeader;
