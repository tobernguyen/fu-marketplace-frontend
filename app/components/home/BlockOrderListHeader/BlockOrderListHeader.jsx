import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';

const BlockOrderListHeader = ({ shopID }) => {
  return (
    <div className="header clearfix">
        <ul className="nav nav-pills">
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/all`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.all}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/new`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.new}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/accepted`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.accepted}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/shipping`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.shipping}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/completed`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.completed}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/rejected`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.rejected}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/canceled`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.canceled}/></Link>
          </li>
          <li>
            <Link to={`shops/${shopID}/dashboard/orders/aborted`} activeClassName="active"><FormattedMessage {...messages.orderList.tableBody.orderStatus.aborted}/></Link>
          </li>
        </ul>
      </div>
  );
}

export default injectIntl(BlockOrderListHeader);