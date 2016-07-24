import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import BlockOrderList from 'app/components/home/BlockOrderList';
import ModalViewOrder from 'app/components/home/ModalViewOrder';
import { updateShopInfo } from 'app/actions/shop';
import {
  sellerGetOrder,
  sellerAcceptOrder,
  sellerRejectOrder,
  sellerStartShippingOrder,
  sellerCompleteOrder,
  sellerAbortOrder,
  getOrdersOfPage,
  clearCurrentOrders
} from 'app/actions/order';
import Sticky from 'react-stickynode';
import { withRouter } from 'react-router'
import OrderStatus from 'app/shared/orderStatus';

class ManageOrders extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    const { status, page, size } = this.props.location.query;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: parseInt(shopID),
        status: status,
        page: page,
        size: size,
        showModal: false,
        showRejectModal: false,
        selectedOrder: {
          orderLines: []
        }
      };
      this.props.sellerGetOrder(shopID, status, page, size);
    }

    this.handleShopInfoChanged = (shopData) => {
      this.props.updateShopInfo(shopData, this.props.params.shopID);
    };

    this.viewOrder = (selectedOrder) => {
      this.setState({
        showModal: true,
        selectedOrder
      })
    };

    this.close = () => {
      this.setState({
        showModal: false
      });
    };

    this.sellerAcceptOrder = (orderID) => {
      this.props.sellerAcceptOrder(orderID);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = OrderStatus.ACCEPTED;
      const currentTime = new Date();
      currentTime.setSeconds(currentTime.getSeconds() - 3);
      selectedOrder['updatedAt'] = currentTime;
      this.setState({
        selectedOrder
      });
    };

    this.sellerRejectOrder = (orderID, messages) => {
      this.props.sellerRejectOrder(orderID, messages);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = OrderStatus.REJECTED;
      this.setState({
        selectedOrder
      });
    };

    this.sellerStartShippingOrder = (orderID) => {
      this.props.sellerStartShippingOrder(orderID);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = OrderStatus.SHIPPING;
      this.setState({
        selectedOrder
      });
    };

    this.sellerCompleteOrder = (orderID) => {
      this.props.sellerCompleteOrder(orderID);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = OrderStatus.COMPLETED;
      this.setState({
        selectedOrder
      });
    };

    this.sellerAbortOrder = (orderID, messages) => {
      this.props.sellerAbortOrder(orderID, messages);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = OrderStatus.ABORTED;
      this.setState({
        selectedOrder
      });
    };

    this.changePageSize = (e) => {
      const pageSize = e.target.value;
      const { query } = this.props.location;
      const { shopID } = this.props.params;
      const page = query.page || 1;
      const status = query.status || 'all';
      this.props.router.push(`/dashboard/shops/${shopID}/orders?size=${pageSize}&page=${page}&status=${status}`);
    };

    this.handleGetOrdersOfPage = (params) => {
      this.props.getOrdersOfPage(shopID, params);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shopID} = nextProps.params;
    const { status, page, size } = nextProps.location.query;
    const {shouldUpdateOrderList} = nextProps;
    if(shopID != this.state.shopID || status != this.state.status || page != this.state.page || size !== this.state.size) {
      this.props.sellerGetOrder(shopID, status, page, size);
      this.setState ({
        shopID: parseInt(shopID),
        status,
        page,
        size
      });
    }
    if(shouldUpdateOrderList === true) {
      this.props.sellerGetOrder(shopID, status, page, size);
    }
  }

  render() {
    const { query } = this.props.location;
    const { currentOrders, orders, hasMore, clearCurrentOrders } = this.props;
    return (
      <div className="container home-body">
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">
              <BlockOrderList
                clearCurrentOrders={clearCurrentOrders}
                hasMore={hasMore}
                shopID ={this.props.params.shopID}
                orders={orders}
                currentOrders={currentOrders}
                viewOrder={this.viewOrder}
                query={query}
                getOrdersOfPage={this.handleGetOrdersOfPage}
                changePageSize={this.changePageSize}
                acceptOrder={this.sellerAcceptOrder}
                rejectOrder={this.sellerRejectOrder}
                startShippingOrder={this.sellerStartShippingOrder}
                completeOrder={this.sellerCompleteOrder}
                abortOrder={this.sellerAbortOrder}
                shouldUpdateOrderList={this.props.shouldUpdateOrderList}
              />
              <ModalViewOrder
                order={this.state.selectedOrder}
                show={this.state.showModal}
                onHide={this.close}
                acceptOrder={this.sellerAcceptOrder}
                rejectOrder={this.sellerRejectOrder}
                startShippingOrder={this.sellerStartShippingOrder}
                completeOrder={this.sellerCompleteOrder}
                abortOrder={this.sellerAbortOrder}
                openRejectModal={this.openRejectModal}
              />
            </div>
          </div>
          <div className="col-md-3">
            <Sticky enabled={true} top={60}>
              <BlockSellerDashboardSideBar
                sellerShop={this.props.sellerShop} />
            </Sticky>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    currentOrders: state.order.currentOrders,
    hasMore: state.order.hasMore,
    orders: state.order.orders,
    sellerShop: shop.sellerShop,
    shouldUpdateOrderList: state.order.shouldUpdateOrderList
  }
};

export default withRouter(connect(mapStateToProps, {
  updateShopInfo,
  sellerGetOrder,
  sellerAcceptOrder,
  sellerRejectOrder,
  sellerStartShippingOrder,
  sellerCompleteOrder,
  sellerAbortOrder,
  getOrdersOfPage,
  clearCurrentOrders
})(ManageOrders))
