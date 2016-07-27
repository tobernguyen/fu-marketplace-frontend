import React, { Component, PropTypes } from 'react';
import BlockCurrentOrderListRow from './BlockCurrentOrderListRow.jsx';
import './BlockCurrentOrderList.scss';
import { PulseLoader } from 'halogen';
import InfiniteScroll from 'app/components/common/InfiniteScroll';
import NoOrderSeller from 'app/components/home/NoOrderSeller';
import { EVENTS } from 'app/shared/socketIOEvents';
import { NOTIFICATION_TYPE } from 'app/shared/notificationMessages';
import OrderStatus from 'app/shared/orderStatus';

class BlockCurrentOrderList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      elements: [],
      socketLoaded: false
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
            removeOrder={this.props.removeOrder}
            startShippingOrder={this.props.startShippingOrder}
            completeOrder={this.props.completeOrder}
            abortOrder={this.props.abortOrder}
          />
        )
      });
    }

    const { socket } = nextProps;
    const { shopID } = nextProps;
     if(socket && !this.state.socketLoaded) {
      this.setState({
        socketLoaded: true
      });

      socket.on(EVENTS.NEW_NOTIFICATION, (packet) => {
        const { data } = packet;
        if(data.shopId == shopID) {
          if(packet.type === NOTIFICATION_TYPE.USER_PLACE_ORDER) {
            this.props.getNewOrder(data.orderId);
          }
          if(packet.type === NOTIFICATION_TYPE.USER_CANCEL_ORDER) {
            this.props.updateOrderStatus(data.orderId, OrderStatus.CANCELED);
            setTimeout(() => {
              this.props.removeOrder(data.orderId);
            }, 7000);
          }
        }
      });
    }
  }

  componentWillUnmount() {
    const { socket } = this.props;
    if(socket) {
      socket.off(EVENTS.NEW_NOTIFICATION);
    }
  }

  render() {
    if(this.props.currentOrders.length === 0) {
      return <NoOrderSeller />
    }
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
