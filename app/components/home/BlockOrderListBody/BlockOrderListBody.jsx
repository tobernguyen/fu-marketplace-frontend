import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';
import NoOrderSeller from 'app/components/home/NoOrderSeller';

import BlockOrderListBodyRow from './BlockOrderListBodyRow.jsx';

class BlockOrderListBody extends Component {
  render() {
    if(this.props.orders.length === 0) {
      return <NoOrderSeller />;
    }
    return (
      <div className="body clearfix">
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th><FormattedMessage {...messages.orderList.tableHead.orderID}/></th>
              <th className="col-lg-2"><FormattedMessage {...messages.orderList.tableHead.items}/></th>
              <th className="col-lg-2"><FormattedMessage {...messages.orderList.tableHead.user}/></th>
              <th className="col-lg-1"><FormattedMessage {...messages.orderList.tableHead.amount}/></th>
              <th className="col-lg-2"><FormattedMessage {...messages.orderList.tableHead.shipAddress}/></th>
              <th className="col-lg-2"><FormattedMessage {...messages.orderList.tableHead.time}/></th>
              <th className="col-lg-2"><FormattedMessage {...messages.orderList.tableHead.status}/></th>
              <th className="col-lg-1"></th>
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
