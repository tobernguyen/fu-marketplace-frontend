import React, { Component, PropTypes } from 'react';
import './BlockShopReviews.scss';
import { FormattedMessage } from 'react-intl';
import FormShopReview from '../FormShopReview';
import BlockShopUserReview from '../BlockShopUserReview';
import _ from 'lodash';

export default class BlockShopReviews extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reviewStatus: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviewStatus) {
      this.setState({
        reviewStatus: {
          id: nextProps.reviewStatus,
          defaultMessage: 'review status'
        }
      })
    }
  }

  render() {
    const { shop, seller, currentUser, reviews } = this.props;
    let ownerView = false;
    if (!_.isEmpty(currentUser) && !_.isEmpty(seller)) {
      ownerView = (currentUser.id === seller.id)
    }
    return (
      <div className="block-shop-reviews">
        <div className="row first-row">
          <div className="col-sm-10 col-sm-offset-1">
            <div className="col-sm-4 avatar">
              <img src={shop.avatar} className="img-circle img-responsive"/>
            </div>
            <div className="col-sm-8 shop-info">
              <h3 className="title">
                {shop.name}
              </h3>
              <div className="description">
                <div className="quote">
                  {shop.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row second-row">
          <div className="col-sm-12">
            <ul className="group-info nav">
              <li>
                <span className="img-avatar">
                  <img src={seller.avatar} className="img-circle img-responsive"/>
                </span>
                <cite>
                  <div>
                    Chủ shop
                  </div>
                  <strong>{seller.fullName}</strong>
                </cite>
              </li>
              <li>
                <span><i className="fa fa-phone"/></span>
                <cite>
                  <div>
                    Điện thoại
                  </div>
                  <strong>{seller.phone}</strong>
                </cite>
              </li>
              <li>
                <span><i className="fa fa-flag"/></span>
                <cite>
                  <div>
                    Địa chỉ
                  </div>
                  <strong>{shop.address}</strong>
                </cite>
              </li>
            </ul>
          </div>
        </div>
        <hr/>
        {!ownerView && <div>
          <div className="row reviews-row">
            <div className="col-sm-offset-1 col-sm-10">
              {!this.state.reviewStatus &&
              <FormShopReview handleSubmitReview={this.props.handleSubmitReview} reviewer={currentUser} />}

              <div className="clearfix col-sm-8 col-sm-offset-2">
                {this.state.reviewStatus && <h5 className="review-status">
                  <FormattedMessage {...this.state.reviewStatus}/>
                </h5>}
              </div>
            </div>
          </div>
          <hr/>
        </div>}
        <div className="row all-reviews">
          <div className="col-sm-offset-2 col-sm-8">
            {reviews.map((review) =>
              <BlockShopUserReview key={review.id}  review={review} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

BlockShopReviews.propTypes = {
  shop: PropTypes.object.isRequired,
  seller: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleSubmitReview: PropTypes.func.isRequired
};
