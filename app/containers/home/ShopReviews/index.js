import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCurrentViewedShop, getUser } from 'app/selectors';
import BlockShopReviews from 'app/components/home/BlockShopReviews';
import { rateShop, getShopReviews } from 'app/actions/shop';

class ShopReviews extends Component {

  constructor(props) {
    super(props);

    this.handleSubmitReview = (stars, comment) => {
      const rateValue = {
        rate: stars,
        comment: comment.trim()
      };

      this.props.rateShop(this.props.shop.id, rateValue);
    }
  }

  componentWillMount() {
    this.props.getShopReviews(this.props.shop.id, {

    })
  }

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
          <BlockShopReviews
            reviews={this.props.reviews}
            reviewStatus={this.props.reviewStatus}
            handleSubmitReview={this.handleSubmitReview}
            currentUser={this.props.currentUser}
            shop={this.props.shop}
            seller={this.props.seller} />
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
    seller: seller,
    reviewStatus: state.shop.reviewStatus,
    reviews: currentViewedShop.reviews
  }
};

export default connect(mapStateToProps, {
  rateShop,
  getShopReviews
})(ShopReviews)

