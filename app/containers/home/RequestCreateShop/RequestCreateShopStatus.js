import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockRequestCreateShopStatus from 'app/components/home/BlockRequestCreateShopStatus';

class RequestCreateShopStatus extends Component {
  render() {
    return (
      <BlockRequestCreateShopStatus request={this.props.request} error={this.props.error} />
    )
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    request: shop.request,
    error: shop.error
  }
};

export default connect(mapStateToProps)(RequestCreateShopStatus)
