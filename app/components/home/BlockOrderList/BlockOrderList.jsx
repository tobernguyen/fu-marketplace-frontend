import React, { Component } from 'react';
import './BlockOrderList.scss';
import BlockOrderListHeader from 'app/components/home/BlockOrderListHeader';
import BlockOrderListBody from 'app/components/home/BlockOrderListBody';
import { injectIntl } from 'react-intl';


class BlockOrderList extends Component {
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
