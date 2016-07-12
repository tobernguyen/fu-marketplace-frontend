import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCurrentViewedShop, getUser } from 'app/selectors';
import BlockShopReviews from 'app/components/home/BlockShopReviews';

class ShopReviews extends Component {
  render() {
    return (
      <div>
        <Modal.Header>
          <Link to={`/shops/${this.props.params.shopID}`} className="close"><span aria-hidden="true">×</span></Link>
          <Modal.Title>
            Shop reviews
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BlockShopReviews currentUser={this.props.currentUser} shop={this.props.shop} seller={this.props.seller} />
        </Modal.Body>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const currentViewedShop = getCurrentViewedShop(state);
  const { shopInfo, seller } = currentViewedShop;
  return {
    currentUser: getUser(state),
    shop: shopInfo,
    seller: seller
  }
};

export default connect(mapStateToProps, {

})(ShopReviews)

