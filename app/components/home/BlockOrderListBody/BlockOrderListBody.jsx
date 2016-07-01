import React, { Component } from 'react';
import { FormattedMessage, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';
import _ from 'lodash';

class BlockOrderListBody extends Component {
    constructor(props) {
    super(props);

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
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.new)}</div>
        break;
      case 1:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.accepted)}</div>
        break;
      case 2:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.shipping)}</div>
        break;
      case 3:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.completed)}</div>
        break;
      case 4:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.rejected)}</div>
        break;
      case 5:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.canceled)}</div>
        break;
      case 6:
        output = <div className={`order-status status-${order.status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.aborted)}</div>
        break;

    }
    return output;

  }

  render() {
    return (
      <div className="body clearfix">
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th><FormattedMessage {...messages.orderList.tableHead.orderID}/></th>
              <th><FormattedMessage {...messages.orderList.tableHead.items}/></th>
              <th><FormattedMessage {...messages.orderList.tableHead.amount}/></th>
              <th><FormattedMessage {...messages.orderList.tableHead.shipAddress}/></th>
              <th><FormattedMessage {...messages.orderList.tableHead.time}/></th>
              <th><FormattedMessage {...messages.orderList.tableHead.status}/></th>
              <th><FormattedMessage {...messages.orderList.tableHead.action}/></th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.orders.map(order =>
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                {this.renderItemNameList(order)}
                </td>
                <td>
                {this.calculateTotalAmount(order)}
                </td>
                <td>
                {order.shipAddress}
                </td>
                <td>
                <FormattedRelative value={new Date(order.createdAt)} />
                </td>
                <td>
                {this.renderOrderStatus(order)}
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => this.props.viewOrder(order)}><i className="fa fa-eye"></i></button>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default injectIntl(BlockOrderListBody);
