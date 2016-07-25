import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSellerShop, getSellerShopItems } from 'app/actions/shop';

class WrapperDashboard extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID
      };
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params) {
      const { shopID } = nextProps.params;
      if (shopID && !isNaN(shopID)) {
        if (shopID !== this.state.shopID) {
          this.setState({
            shopID: shopID
          }, () => {
            this.fetchData();
          })
        }
      }
    }
  }

  fetchData() {
    const { shopID } = this.state;
    if (shopID) {
      this.props.getSellerShop(shopID);
      this.props.getSellerShopItems(shopID);
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

export default connect(undefined, {
  getSellerShop,
  getSellerShopItems
})(WrapperDashboard)
