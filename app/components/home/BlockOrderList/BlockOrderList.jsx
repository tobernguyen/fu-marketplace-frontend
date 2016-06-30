import React, { Component } from 'react';
import './BlockOrderList.scss';
import BlockOrderListHeader from 'app/components/home/BlockOrderListHeader';
import BlockOrderListBody from 'app/components/home/BlockOrderListBody';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from './BlockOrderList.i18n';
import TimeAgo from 'react-timeago'
import { Link } from 'react-router';
import _ from 'lodash';

class BlockOrderList extends Component {
  constructor(props) {
    super(props);

    this.renderTimeAgo = this.renderTimeAgo.bind(this);
    this.renderOrderStatus = this.renderOrderStatus.bind(this);
  }
  renderItemNameList(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, orderLine.item.name);
    });
    return _.toString(names);
  }
  calculateTotalAmount(order) {
    let total = 0;
    order.orderLines.map(orderLine => {
      total += orderLine.item.price * orderLine.quantity
    });

    return total.toLocaleString('EN-us')+'₫';
  }
  renderTimeAgo(value, unit, suffix) {
    const { formatMessage } = this.props.intl;
    let realUnit = '';
    switch (unit) {
      case 'second':
        realUnit = formatMessage(messages.orderList.tableBody.timeUnit.second);
        break;
      case 'minute':
        realUnit =formatMessage(messages.orderList.tableBody.timeUnit.minute);
        break;
      case 'hour':
        realUnit = formatMessage(messages.orderList.tableBody.timeUnit.hour);
        break;
      case 'day':
        realUnit = formatMessage(messages.orderList.tableBody.timeUnit.day);
        break;
      case 'month':
        realUnit = formatMessage(messages.orderList.tableBody.timeUnit.month);
        break;
      case 'year':
        realUnit = formatMessage(messages.orderList.tableBody.timeUnit.year);
        break;
    }

    return value + ' ' + realUnit + ' ' +formatMessage(messages.orderList.tableBody.timeSuffix);
  }
  renderOrderStatus(order) {
    const { formatMessage } = this.props.intl;
    let output = '';
    switch(order.status) {
      case 0:
        output = <div className="order-status new">{formatMessage(messages.orderList.tableBody.orderStatus.new)}</div>
        break;
      case 1:
        output = <div className="order-status accepted">{formatMessage(messages.orderList.tableBody.orderStatus.accepted)}</div>
        break;
      case 2:
        output = <div className="order-status shipping">{formatMessage(messages.orderList.tableBody.orderStatus.shipping)}</div>
        break;
      case 3:
        output = <div className="order-status completed">{formatMessage(messages.orderList.tableBody.orderStatus.completed)}</div>
        break;
      case 4:
        output = <div className="order-status rejected">{formatMessage(messages.orderList.tableBody.orderStatus.rejected)}</div>
        break;
      case 5:
        output = <div className="order-status canceled">{formatMessage(messages.orderList.tableBody.orderStatus.canceled)}</div>
        break;
      case 6:
        output = <div className="order-status aborted">{formatMessage(messages.orderList.tableBody.orderStatus.aborted)}</div>
        break;

    }
    return output;

  }
  render() {
    const { shopID, orders } = this.props;
    return (
      <div className="block-order-list clearfix">
      <BlockOrderListHeader shopID={shopID}/>
      <BlockOrderListBody orders={orders} viewOrder={this.props.viewOrder}/>
      </div>
    )
  }
}

export default injectIntl(BlockOrderList);