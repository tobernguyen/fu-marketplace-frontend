import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';

const BlockOrderListHeader = ({ shopID }) => {
  return (
    <div className="header clearfix">
        <ul className="nav nav-pills">
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'all'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.all}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'new'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.new}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'accepted'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.accepted}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'shipping'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.shipping}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'completed'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.completed}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'rejected'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.rejected}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'canceled'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.canceled}/></Link>
          </li>
          <li>
            <Link to={{ pathname: `shops/${shopID}/dashboard/orders` , query: { status: 'aborted'} }} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.aborted}/></Link>
          </li>
        </ul>
      </div>
  );
}

export default injectIntl(BlockOrderListHeader);
