import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSellerShop } from 'app/actions/shop';

class WrapperDashboard extends Component {

  componentWillMount() {
    this.props.getSellerShop(this.props.params.shopID)
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
  getSellerShop
})(WrapperDashboard)
