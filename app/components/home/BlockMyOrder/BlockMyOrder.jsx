import React, { Component } from 'react';
import './BlockMyOrder.scss';
import { FormattedMessage, FormattedTime, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import { Link } from 'react-router';
import _ from 'lodash';

class BlockMyOrder extends Component {
  renderItemNameList(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, orderLine.item.name);
    });
    return _.toString(names);
  }
  calculateTotalAmount(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + (order.item.price * order.quantity);
    }, 0);
    return <FormattedNumber value={total} style="currency" currency="VND"/>;
  }
  renderOrderStatus(order) {
    const { formatMessage } = this.props.intl;
    let output = '';
    switch(order.status) {
      case 0:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.new)}</div>
        break;
      case 1:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.accepted)}</div>
        break;
      case 2:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.shipping)}</div>
        break;
      case 3:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.completed)}</div>
        break;
      case 4:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.rejected)}</div>
        break;
      case 5:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.canceled)}</div>
        break;
      case 6:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.myOrder.tableBody.orderStatus.aborted)}</div>
        break;

    }
    return output;

  }
  renderFinishTime(order) {
    if (order.status === 3) { //Order is completed
      return <FormattedTime value={new Date(order.createdAt)}/>
    } else {
      return <FormattedMessage {...messages.myOrder.tableBody.notFinish}/>
    }
  }
  renderOrderList(orders) {
    return (
      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th><FormattedMessage {... messages.myOrder.tableHead.item}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.total} /></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.shipAddress}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.time} /></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.finishedTime}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.status}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.action}/></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{this.renderItemNameList(order)}</td>
              <td>{this.calculateTotalAmount(order)}</td>
              <td>{order.shipAddress}</td>
              <td><FormattedRelative value={new Date(order.createdAt)}/></td>
              <td>{this.renderFinishTime(order)}</td>
              <td>{this.renderOrderStatus(order)}</td>
              <td>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  renderEmptyOrderList() {
    return (
    <div className="alert alert-warning">
      <FormattedMessage {...messages.myOrder.emptyOrderList.message.text}/>
      <Link to="/" ><FormattedMessage {...messages.myOrder.emptyOrderList.link}/></Link>
    </div>
    );
  }
  renderMyOrder(orders) {
    let output = '';
    if (!orders || orders.length == 0) {
      output = this.renderEmptyOrderList();
    } else {
      output = this.renderOrderList(orders);
    }
    return output;
  }
  render() {
    const { orders } = this.props;
    return (
      <div>
        {this.renderMyOrder(orders)}
      </div>
    );
  }
}

export default injectIntl(BlockMyOrder);
