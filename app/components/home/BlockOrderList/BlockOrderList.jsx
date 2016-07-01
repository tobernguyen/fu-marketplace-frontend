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
  render() {
    const { shopID, orders } = this.props;
    return (
      <div className="block-order-list clearfix">
      <BlockOrderListHeader shopID={shopID}/>
      <BlockOrderListBody orders={orders} />
      </div>
    )
  }
}

export default injectIntl(BlockOrderList);