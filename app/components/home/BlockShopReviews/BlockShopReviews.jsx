import React, { Component, PropTypes } from 'react';
import './BlockShopReviews.scss';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import FormShopReview from '../FormShopReview';
import BlockShopUserReview from '../BlockShopUserReview';
import _ from 'lodash';
import { messages } from './BlockShopReviews.i18n';

class BlockShopReviews extends Component {

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

  componentWillUnmount() {
    this.props.clearReviewStatus();
  }

  render() {
    const { shop, seller, currentUser, reviews } = this.props;
    const { formatMessage } = this.props.intl;
    let ownerView = false;
    if (!_.isEmpty(currentUser) && !_.isEmpty(seller)) {
      ownerView = (currentUser.id === seller.id)
    }
    return (
      <div className="block-shop-reviews">
        <div className="row first-row">
          <div className="col-sm-10 col-sm-offset-1">
            <div className="col-sm-4 col-xs-3 avatar">
              <img src={shop.avatar} className="img-circle img-responsive"/>
            </div>
            <div className="col-sm-8 col-xs-9 shop-info">
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
          <div className="col-sm-12 col-xs-10 col-xs-offset-2">
            <ul className="group-info nav">
              <li>
                <span className="img-avatar">
                  <img src={seller.avatar} className="img-circle img-responsive"/>
                </span>
                <cite>
                  <div>
                    {formatMessage(messages.shopOwner)}
                  </div>
                  <strong>{seller.fullName}</strong>
                </cite>
              </li>
              <li>
                <span><i className="fa fa-phone"/></span>
                <cite>
                  <div>
                    {formatMessage(messages.shopPhone)}
                  </div>
                  <strong>{seller.phone}</strong>
                </cite>
              </li>
              <li>
                <span><i className="fa fa-flag"/></span>
                <cite>
                  <div>
                    {formatMessage(messages.shopAddress)}
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
              <FormShopReview
                handleSubmitReview={this.props.handleSubmitReview}
                reviewer={currentUser} />}

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
  handleSubmitReview: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};


export default injectIntl(BlockShopReviews)
