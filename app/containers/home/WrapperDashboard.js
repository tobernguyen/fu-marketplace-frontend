import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSellerShop, getSellerShopItems } from 'app/actions/shop';
import { withRouter } from 'react-router';


class WrapperDashboard extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID
      };
      this.props.getSellerShop(shopID);
    } else {
      this.state = {
        invalidShopID: true
      }
    }
  }

  componentWillMount() {
    if (this.state.invalidShopID) {
      this.props.router.push('/404');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params) {
      const { shopID } = nextProps.params;
      if (shopID && !isNaN(shopID) && shopID != this.state.shopID) {
        if (nextProps.sellerShop.id != shopID) {
          this.props.getSellerShop(shopID);
        }
      }
    }

    if (nextProps.sellerShop) {
      if (nextProps.sellerShop.id != this.state.shopID) {
        this.setState({
          shopID: nextProps.sellerShop.id
        })
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sellerShop: state.shop.sellerShop,
    sellingItems: state.shop.sellingItems
  }
};

export default withRouter(connect(mapStateToProps, {
  getSellerShop,
  getSellerShopItems
})(WrapperDashboard))
