import React, { Component } from 'react';
import BlockCurrentOrderListRow from './BlockCurrentOrderListRow.jsx';
import './BlockCurrentOrderList.scss';
import { PulseLoader } from 'halogen';
import Infinite from 'react-infinite';

class BlockCurrentOrderList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      isInfiniteLoading: false,
      loadedPage: 0,
      loadedOrders: 0,
      query: {}
    };

    this.handleInfiniteLoad = () => {
      const { query, isInfiniteLoading } = this.state;
      const { shopID } = this.props;
      if(!isInfiniteLoading) {
        let params = {
          shopID: shopID,
          page: this.state.loadedPage + 1,
          size: 10
        };

        if (query) {

        }

        this.props.getShopsOfPage(params, this.state.loadedPage === 0);
        this.setState({
          isInfiniteLoading: true
        });
      }
    }

    this.elementInfiniteLoad = () => {
      return (
        <PulseLoader className="feed-loader" color="#C0392B" size="12px" />
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    const { query, isInfiniteLoading } = this.state;
    const { shopID } = nextProps;
    if(nextProps.orders) {
      if(nextProps.orders.length > this.state.loadedOrders) {
        this.setState({
          loadedOrders: nextProps.orders.length,
          loadedPage: this.state.loadedPage + 1
        })
      } else if (nextProps.orders.length === 0) {
        this.setState({
          loadedPage: 0,
          loadedOrders: 0
        })
      }

      this.setState({
        isInfiniteLoading: false
      })
    }
    if(nextProps.shouldUpdateOrderList && !isInfiniteLoading) {
      let params = {
        shopID: shopID,
        page: this.state.loadedPage,
        size: 10
      };

      if (query) {

      }

      this.props.getShopsOfPage(params, this.state.loadedPage === 0);
      this.setState({
        isInfiniteLoading: true
      });
    }
  }

  render() {
    const { orders } = this.props;
    return (
      <div className="current-order-list">
      <Infinite elementHeight={250}
                                     containerHeight={window.innerHeight}
                                     elementHeight={150}
                                     infiniteLoadBeginEdgeOffset={0}
                                     onInfiniteLoad={this.handleInfiniteLoad}
                                     loadingSpinnerDelegate={this.elementInfiniteLoad()}
                                     isInfiniteLoading={this.state.isInfiniteLoading}
                                     timeScrollStateLastsForAfterUserScrolls>
        {orders.map(order =>
          <BlockCurrentOrderListRow
            key={order.id}
            order={order}
            acceptOrder={this.props.acceptOrder}
            rejectOrder={this.props.rejectOrder}
            startShippingOrder={this.props.startShippingOrder}
            completeOrder={this.props.completeOrder}
            abortOrder={this.props.abortOrder}
            />
        )}
        </Infinite>
      </div>
    );
  }
}

export default BlockCurrentOrderList;
