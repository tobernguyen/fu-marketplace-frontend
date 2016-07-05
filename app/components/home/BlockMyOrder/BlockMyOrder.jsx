import React, { Component } from 'react';
import './BlockMyOrder.scss';
import BlockMyOrderFooter from './BlockMyOrderFooter.jsx'
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
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
              <td><LabelOrderStatus status={order.status}/></td>
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
    const { orders, page, changePageSize, size } = this.props;
    return (
      <div>
        {this.renderMyOrder(orders)}
        <BlockMyOrderFooter
          page={page}
          orders={orders}
          size={size}
          changePageSize={changePageSize}
        />
      </div>
    );
  }
}

export default injectIntl(BlockMyOrder);
