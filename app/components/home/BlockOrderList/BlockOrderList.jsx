import React, { Component, PropTypes } from 'react';
import './BlockOrderList.scss';
import BlockOrderListHeader from 'app/components/home/BlockOrderListHeader';
import BlockManageOrderHeader from 'app/components/home/BlockManageOrderHeader';
import BlockCurrentOrderList from 'app/components/home/BlockCurrentOrderList';
import BlockOrderListBody from 'app/components/home/BlockOrderListBody';
import BlockOrderListFooter from 'app/components/home/BlockOrderListFooter';
import { injectIntl } from 'react-intl';


class BlockOrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCurrent: true
    };

    this.changeOrderListDisplay = (isCurrent) => {
      if (!isCurrent) {
        // If switch to ALL tab, reset content in CURRENT page
        this.props.clearCurrentOrders()
      }
      this.setState({
        isCurrent
      });

    }
  }

  componentWillUnmount() {
    this.props.clearCurrentOrders();
  }


  render() {
    const { status, size, page, socket, shopID, currentOrders, orders, changePageSize, removeOrder, getOrdersOfPage, updateOrderStatus, getNewOrder, sellerShop, hasNextPage, isFetchingNextPage } = this.props;
    const { isCurrent } = this.state;
    if(isCurrent) {
      return (
        <div>
          <BlockManageOrderHeader
            sellerShop={sellerShop}
            isCurrent={this.state.isCurrent}
            changeOrderListDisplay={this.changeOrderListDisplay}/>
            <BlockCurrentOrderList
              socket={socket}
              removeOrder={removeOrder}
              updateOrderStatus={updateOrderStatus}
              getNewOrder={getNewOrder}
              shopID={this.props.shopID}
              currentOrders={currentOrders}
              getOrdersOfPage={getOrdersOfPage}
              acceptOrder={this.props.acceptOrder}
              rejectOrder={this.props.rejectOrder}
              startShippingOrder={this.props.startShippingOrder}
              completeOrder={this.props.completeOrder}
              abortOrder={this.props.abortOrder}
              shouldUpdateOrderList={this.props.shouldUpdateOrderList}
              hasMore={this.props.hasMore}
              isFetching={this.props.isFetching}
              viewOrder={this.props.viewOrder}
              />
        </div>)

    }
    return (
      <div>
        <BlockManageOrderHeader isCurrent={this.state.isCurrent} changeOrderListDisplay={this.changeOrderListDisplay}/>
        <div className="block-order-list clearfix">
          <BlockOrderListHeader changeStatus={this.props.changeStatus} status={status}/>
          <BlockOrderListBody
            orders={orders}
            viewOrder={this.props.viewOrder}
            isFetching={this.props.isFetching}
            sellerGetOrder={this.props.sellerGetOrder}
            sellerGetOrderOfNextPage={this.props.sellerGetOrderOfNextPage}
            isFetchingNextPage={this.props.isFetchingNextPage}
            shopID={shopID}
            status={status}
            size={size}
            page={page}
            />
          <BlockOrderListFooter
            shopID={shopID}
            status={status}
            size={size}
            page={page}
            hasNextPage={hasNextPage}
            changePageSize={changePageSize}
            prevPage={this.props.prevPage}
            nextPage={this.props.nextPage}
            />
        </div>
      </div>
    )
  }
}

BlockOrderList.propTypes = {
  clearCurrentOrders: PropTypes.func.isRequired
};

export default injectIntl(BlockOrderList);
