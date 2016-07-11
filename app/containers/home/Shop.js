import React, { Component } from 'react';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import { connect } from 'react-redux';
import { updateModalSize } from '../../actions/common';
import SellingItemList from './SellingItemList';
import { getUserShop, clearCurrentViewedShop } from 'app/actions/user';
import { placeOrder, clearOrderResult } from 'app/actions/order';
import { registerOneSignal } from 'app/actions/notification';
import { Link } from 'react-router';
import BuyNowForm from './PlaceOrder/BuyNowForm';
import CheckOutPage from './PlaceOrder/CheckOutPage';
import classNames from 'classnames';
import { getCurrentViewedShop } from 'app/selectors';
import OneSignal from 'onesignal';
import { Modal } from 'react-bootstrap';

class Shop extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopValid: true,
        showModal: false,
        pushNotificationEnabled: false
      };
      this.props.getUserShop(shopID);
    }

    this.handleCheckOut = () => {
      this.setState({ showModal: true, bsSize: null });
    };

    this.handleBuyNow = (item) => {
      this.setState({ showModal: true, bsSize: 'sm', item: item });
    };

    this.close = () => {
      this.setState({ showModal: false, item: null });
      this.props.clearOrderResult();
      this.setState({ showModal: false });
    };

    this.handleExpressOrder = (formData) => {
      const { shopID } = this.props.params;
      const { item } = this.state;
      const order = {
        items: [
          {
            id: item.id,
            quantity: formData.quantity,
            note: formData.note
          }
        ],
        note: '',
        shipAddress: formData.shipAddress
      };
      this.props.placeOrder(shopID, order);
    };

  }

  componentWillMount() {
    this.props.updateModalSize('lg');
    if (!this.state.pushNotificationEnabled) {
      OneSignal.push(() => {
        OneSignal.on('subscriptionChange', (isSubscribed) => {
          this.setState({
            pushNotificationEnabled: isSubscribed
          });
          if (isSubscribed) {
            OneSignal.push(['getUserId', (playerId) => {
              this.props.registerOneSignal(playerId);
            }]);
          }
        });
      });
    }
  }


  componentWillUnmount() {
    this.props.clearCurrentViewedShop();
  }

  componentDidMount() {
    OneSignal.push(['isPushNotificationsEnabled', (enabled) => {
      this.setState({
        pushNotificationEnabled: enabled
      })
    }]);


  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasChildren: nextProps.children !== null
    })
  }

  render() {
    const { shop } = this.props;
    let orderForm;
    if (this.state.item) {
      orderForm = <BuyNowForm
        oneSignalRegistered={this.props.oneSignalRegistered}
        pushNotificationEnabled={this.state.pushNotificationEnabled}
        show={this.state.showModal}
        onHide={this.close}
        bsSize={this.state.bsSize}
        item={this.state.item}
        handleExpressOrder={this.handleExpressOrder} />
    } else {
      orderForm = <CheckOutPage
        oneSignalRegistered={this.props.oneSignalRegistered}
        pushNotificationEnabled={this.state.pushNotificationEnabled}
        shopID={this.props.params.shopID}
        show={this.state.showModal}
        onHide={this.close}
        bsSize={this.state.bsSize} />
    }

    return (
      <div className={classNames('shop-detail-modal', {'dim': this.state.showModal || this.props.children})}>
        {this.state.shopValid && <div>
          <BlockShopHeader shop={shop} sellerMode={false} />
          <SellingItemList
            shopOpening={shop.opening}
            shopID={parseInt(this.props.params.shopID)}
            sellerMode={false}
            sellingItems={this.props.sellingItems}
            checkOut={this.handleCheckOut}
            buyNow={this.handleBuyNow} />
          <Link to='/' className="close"><span>×</span></Link>
        </div>}
        {shop.opening && orderForm}
        {(this.state.hasChildren) && <Modal show={this.state.hasChildren}>
          {this.props.children}
        </Modal>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { notification: { oneSignalRegistered } } = state;
  const currentViewedShop = getCurrentViewedShop(state);
  const { shopInfo, seller, sellingItems } = currentViewedShop;
  return {
    shop: shopInfo,
    seller: seller,
    sellingItems: sellingItems,
    oneSignalRegistered: oneSignalRegistered
  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  getUserShop,
  placeOrder,
  clearOrderResult,
  clearCurrentViewedShop,
  registerOneSignal
})(Shop)
