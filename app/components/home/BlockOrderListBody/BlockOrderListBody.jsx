import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';
import NoOrderSeller from 'app/components/home/NoOrderSeller';
import BlockOrderListBodyRow from './BlockOrderListBodyRow.jsx';
import { PulseLoader } from 'halogen';

class BlockOrderListBody extends Component {
  componentWillMount() {
    const { isFetching, sellerGetOrder, status, page, size, shopID } = this.props;
    if(!isFetching) {
      sellerGetOrder(shopID, status, page, size);
    }
  }
  render() {
    if(this.props.isFetching) {
      const style ={
        'height': '50px',
        'width': '100%',
        'padding': '20px'
      };
      return (
        <div className="text-center" style={style}>
          <PulseLoader className="feed-loader" color="#C0392B" size="12px" />
        </div>
      );
    }
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
