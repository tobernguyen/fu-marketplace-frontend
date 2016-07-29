import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';

const BlockOrderListHeader = ({ shopID, status, changeStatus }) => {
  const ordersPath = `/dashboard/shops/${shopID}/orders`;
  return (
    <div className="header clearfix">
        <ul className="nav nav-pills">
          <li>
            <Link className={`${status === 'all'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('all'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.all}/></Link>
          </li>
          <li>
            <Link className={`${status === 'new'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('new'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.new}/></Link>
          </li>
          <li>
            <Link className={`${status === 'accepted' ? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('accepted'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.accepted}/></Link>
          </li>
          <li>
            <Link className={`${status === 'shipping'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('shipping'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.shipping}/></Link>
          </li>
          <li>
            <Link className={`${status === 'completed'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('completed'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.completed}/></Link>
          </li>
          <li>
            <Link className={`${status === 'rejected'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('rejected'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.rejected}/></Link>
          </li>
          <li>
            <Link className={`${status === 'canceled'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('canceled'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.canceled}/></Link>
          </li>
          <li>
            <Link className={`${status === 'aborted'? 'active' : ''}`} to={{ pathname: ordersPath }} onClick={(e) => {e.preventDefault(); changeStatus('aborted'); }}><FormattedMessage {...messages.orderList.tableBody.orderStatus.aborted}/></Link>
          </li>
        </ul>
      </div>
  );
}

export default injectIntl(BlockOrderListHeader);
