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
  clearCurrentOrders,
  updateOrderStatus,
  getNewOrder,
  removeOrder
} from 'app/actions/order';
import Sticky from 'react-stickynode';
import OrderStatus from 'app/shared/orderStatus';

const FIRST_PAGE = 1;
const DEFAULT_SIZE = 20;

class ManageOrders extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: parseInt(shopID),
        status: 'all',
        page: FIRST_PAGE,
        size: DEFAULT_SIZE,
        showModal: false,
        showRejectModal: false,
        selectedOrder: {
          orderLines: []
        }
      };
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
      const { shopID, status } = this.state;
      const size = e.target.value;
      if (!isNaN(size)) {
        this.setState({
          size: size,
          page: FIRST_PAGE
        });
        this.props.sellerGetOrder(shopID, status, FIRST_PAGE, size);
      }
    };

    this.changeStatus = (status) => {
      const { shopID, size } = this.state;
      this.setState({
        status: status,
        page: FIRST_PAGE
      });
      this.props.sellerGetOrder(shopID, status, FIRST_PAGE, size);
    }

    this.prevPage = (e) => {
      e.preventDefault();
      const { shopID, status } = this.state;
      if (this.state.page > FIRST_PAGE) {
        this.setState({
          page: this.state.page - 1
        }, () => {
          this.props.sellerGetOrder(shopID, status,this.state.page, this.state.size);
        })
      }
    };

    this.nextPage = (e) => {
      e.preventDefault();
      const { shopID, status } = this.state;
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.sellerGetOrder(shopID, status, this.state.page, this.state.size);
      })
    };

    this.handleGetOrdersOfPage = (params) => {
      this.props.getOrdersOfPage(shopID, params);
    };

    this.handleShopInfoChanged = (shopData) => {
      this.props.updateShopInfo(shopData, this.props.params.shopID);
    }
  }

  render() {
    const { socket, currentOrders, orders, hasMore, clearCurrentOrders, updateOrderStatus, getNewOrder, removeOrder, sellerGetOrder, sellerShop } = this.props;
    const { page, size, status } = this.state;
    return (
      <div className="container home-body">
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">
              <BlockOrderList
                sellerShop={sellerShop}
                socket={socket}
                sellerGetOrder={sellerGetOrder}
                updateOrderStatus={updateOrderStatus}
                getNewOrder={getNewOrder}
                removeOrder={removeOrder}
                clearCurrentOrders={clearCurrentOrders}
                hasMore={hasMore}
                shopID ={this.props.params.shopID}
                orders={orders}
                currentOrders={currentOrders}
                viewOrder={this.viewOrder}
                page={page}
                size={size}
                status={status}
                getOrdersOfPage={this.handleGetOrdersOfPage}
                changePageSize={this.changePageSize}
                acceptOrder={this.sellerAcceptOrder}
                rejectOrder={this.sellerRejectOrder}
                startShippingOrder={this.sellerStartShippingOrder}
                completeOrder={this.sellerCompleteOrder}
                abortOrder={this.sellerAbortOrder}
                shouldUpdateOrderList={this.props.shouldUpdateOrderList}
                isFetching={this.props.isFetching}
                prevPage={this.prevPage}
                nextPage={this.nextPage}
                changeStatus={this.changeStatus}
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
                sellerShop={this.props.sellerShop}
                shopInfoChanged={this.handleShopInfoChanged}/>
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
    shouldUpdateOrderList: state.order.shouldUpdateOrderList,
    isFetching: state.order.isFetching,
    socket: state.common.socket
  }
};

export default connect(mapStateToProps, {
  updateShopInfo,
  sellerGetOrder,
  sellerAcceptOrder,
  sellerRejectOrder,
  sellerStartShippingOrder,
  sellerCompleteOrder,
  sellerAbortOrder,
  getOrdersOfPage,
  clearCurrentOrders,
  updateOrderStatus,
  getNewOrder,
  removeOrder
})(ManageOrders);
