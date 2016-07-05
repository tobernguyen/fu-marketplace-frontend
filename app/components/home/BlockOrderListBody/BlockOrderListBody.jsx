import React, { Component } from 'react';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import { FormattedMessage, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';
import _ from 'lodash';

class BlockOrderListBody extends Component {
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
                  <LabelOrderStatus status={order.status}/>
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
