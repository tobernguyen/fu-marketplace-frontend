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
      this.fetchData();
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

export default withRouter(connect(undefined, {
  getSellerShop,
  getSellerShopItems
})(WrapperDashboard))
