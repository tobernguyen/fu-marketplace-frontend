import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import BlockOrderList from 'app/components/home/BlockOrderList';
import ModalViewOrder from 'app/components/home/ModalViewOrder';
import { getSellerShop, updateShopInfo } from 'app/actions/shop';
import { sellerGetOrder, sellerAcceptOrder, sellerRejectOrder } from 'app/actions/order';
import Sticky from 'react-stickynode';
import { getUser } from 'app/selectors';
import NavigationBar from 'app/containers/home/NavigationBar';

class ManageOrders extends Component {
  constructor(props) {
    super(props);

    const { shopID, status } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID,
        status: status,
        showModal: false,
        showRejectModal: false,
        selectedOrder: {
          orderLines: []
        }
      };
      this.props.getSellerShop(shopID);
      this.props.sellerGetOrder(shopID, status);
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
    }

    this.sellerAcceptOrder = (orderID) => {
      const { shopID, status } = this.props.params;
      this.props.sellerAcceptOrder(orderID);
      this.props.sellerGetOrder(shopID, status);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = 3;
      this.setState({
        selectedOrder
      });
    }

    this.sellerRejectOrder = (orderID, messages) => {
      this.props.sellerRejectOrder(orderID, messages);
      let selectedOrder = this.state.selectedOrder;
      selectedOrder['status'] = 4;
      this.setState({
        selectedOrder
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shopID, status} = nextProps.params;
    if(shopID != this.state.shopID || status != this.state.status) {
      this.props.sellerGetOrder(shopID, status);
      this.setState ({
        shopID,
        status
      });
    }
  }
  render() {
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
                  viewOrder={this.viewOrder}/>
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
    sellerShop: shop.sellerShop
  }
};

export default connect(mapStateToProps, {
  getSellerShop,
  updateShopInfo,
  sellerGetOrder,
  sellerAcceptOrder,
  sellerRejectOrder
})(ManageOrders)
