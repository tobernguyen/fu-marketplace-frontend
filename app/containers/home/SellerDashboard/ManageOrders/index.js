import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import BlockOrderList from 'app/components/home/BlockOrderList';
import ModalViewOrder from 'app/components/home/ModalViewOrder';
import { getSellerShop, updateShopInfo } from 'app/actions/shop';
import { sellerGetOrder, sellerAcceptOrder, sellerRejectOrder } from 'app/actions/order';
import Sticky from 'react-stickynode';
import NavigationBar from 'app/containers/home/NavigationBar';
import { withRouter } from 'react-router'

class ManageOrders extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    const { status, page, size } = this.props.location.query;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID,
        status: status,
        page: page,
        size: size,
        showModal: false,
        showRejectModal: false,
        selectedOrder: {
          orderLines: []
        }
      };
      this.props.getSellerShop(shopID);
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
      selectedOrder['status'] = 1;
      this.setState({
        selectedOrder
      });
    };

    this.sellerRejectOrder = (orderID, messages) => {
      this.props.sellerRejectOrder(orderID, messages);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = 4;
      this.setState({
        selectedOrder
      });
    }

    this.changePageSize = (e) => {
      const pageSize = e.target.value;
      const { query } = this.props.location;
      const { shopID } = this.props.params;
      const page = query.page || 1;
      const status = query.status || 'all';
      this.props.router.push(`/shops/${shopID}/dashboard/orders?size=${pageSize}&page=${page}&status=${status}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shopID} = nextProps.params;
    const { status, page, size } = nextProps.location.query;
    const {shouldUpdateOrderList} = nextProps;
    if(shopID != this.state.shopID || status != this.state.status || page != this.state.page || size !== this.state.size) {
      this.props.sellerGetOrder(shopID, status, page, size);
      this.setState ({
        shopID,
        status,
        page,
        size
      });
    }
    if(shouldUpdateOrderList === true) {
      this.props.sellerGetOrder(shopID, status);
    }
  }

  render() {
    const { query } = this.props.location;
    return (
      <div className="home-page">
        <NavigationBar />
        <div className="container home-body">
          <div className="seller-dashboard">
            <div className="col-md-9">
              <div className="row">
                <BlockOrderList
                  shopID ={this.props.params.shopID}
                  orders={this.props.orders}
                  viewOrder={this.viewOrder}
                  query={query}
                  changePageSize={this.changePageSize}
                  />
                <ModalViewOrder
                  order={this.state.selectedOrder}
                  show={this.state.showModal}
                  onHide={this.close}
                  acceptOrder={this.sellerAcceptOrder}
                  rejectOrder={this.sellerRejectOrder}
                  openRejectModal={this.openRejectModal}
                />
              </div>
            </div>
            <div className="col-md-3">
              <Sticky enabled={true} top={60}>
                <BlockSellerDashboardSideBar sellerShop={this.props.sellerShop}
                                             shopInfoChanged={this.handleShopInfoChanged}
                                             shopID={this.state.shopID} />
              </Sticky>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    orders: state.order.orders,
    sellerShop: shop.sellerShop,
    shouldUpdateOrderList: state.order.shouldUpdateOrderList
  }
};

export default connect(mapStateToProps, {
  getSellerShop,
  updateShopInfo,
  sellerGetOrder,
  sellerAcceptOrder,
  sellerRejectOrder
})(withRouter(ManageOrders))
