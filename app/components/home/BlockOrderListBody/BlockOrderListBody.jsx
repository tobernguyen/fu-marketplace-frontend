import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';

import BlockOrderListBodyRow from './BlockOrderListBodyRow.jsx';

class BlockOrderListBody extends Component {
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
              <BlockOrderListBodyRow key={order.id} order={order} viewOrder={this.props.viewOrder}/>
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default BlockOrderListBody;
