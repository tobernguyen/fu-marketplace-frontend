import React, { Component } from 'react';
import './BlockOrderList.scss';
import BlockOrderListHeader from 'app/components/home/BlockOrderListHeader';
import BlockOrderListBody from 'app/components/home/BlockOrderListBody';
import BlockOrderListFooter from 'app/components/home/BlockOrderListFooter';
import { injectIntl } from 'react-intl';


class BlockOrderList extends Component {
  render() {
    const { shopID, orders,query, changePageSize } = this.props;
    const size = query.size || 10;
    const hasNextPage = orders.length < size;
    return (
      <div className="block-order-list clearfix">
      <BlockOrderListHeader shopID={shopID}/>
      <BlockOrderListBody orders={orders} viewOrder={this.props.viewOrder}/>
      <BlockOrderListFooter
        shopID={shopID}
        query={query}
        hasNextPage={hasNextPage}
        changePageSize={changePageSize}
        />
      </div>
    )
  }
}

export default injectIntl(BlockOrderList);
