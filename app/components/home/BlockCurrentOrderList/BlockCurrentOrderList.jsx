import React, { Component, PropTypes } from 'react';
import BlockCurrentOrderListRow from './BlockCurrentOrderListRow.jsx';
import './BlockCurrentOrderList.scss';
import { PulseLoader } from 'halogen';
import InfiniteScroll from 'app/components/common/InfiniteScroll';

class BlockCurrentOrderList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      elements: []
    };

    this.loadMore = (page) => {
      this.props.getOrdersOfPage({
        page: page,
        type: 'ACTIVE'
      });
    };
  }

  componentWillMount() {
    this.props.getOrdersOfPage({
      page: 1,
      type: 'ACTIVE'
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentOrders) {
      this.setState({
        elements: nextProps.currentOrders.map((order) =>
          <BlockCurrentOrderListRow
            key={order.id}
            order={order}
            acceptOrder={this.props.acceptOrder}
            rejectOrder={this.props.rejectOrder}
            startShippingOrder={this.props.startShippingOrder}
            completeOrder={this.props.completeOrder}
            abortOrder={this.props.abortOrder}
          />
        )
      });
    }
  }

  render() {
    return (
      <div className="current-order-list">
        {this.state.elements.length > 0 &&
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadMore}
          hasMore={this.props.hasMore}
          loader={<PulseLoader className="feed-loader" color="#C0392B" size="12px" />}>
          {this.state.elements}
        </InfiniteScroll>}
      </div>
    );
  }
}

BlockCurrentOrderList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  acceptOrder: PropTypes.func.isRequired,
  rejectOrder: PropTypes.func.isRequired,
  abortOrder: PropTypes.func.isRequired,
  startShippingOrder: PropTypes.func.isRequired,
  completeOrder: PropTypes.func.isRequired,
  getOrdersOfPage: PropTypes.func.isRequired,
  currentOrders: PropTypes.array.isRequired
};

export default BlockCurrentOrderList;
