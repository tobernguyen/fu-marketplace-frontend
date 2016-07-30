import React, { Component, PropTypes } from 'react';
import BlockStars from '../BlockStars';
import { FormattedDate } from 'react-intl';
import ReactEmoji from 'react-emoji';

export default class BlockShopUserReview extends Component {
  render() {
    const { review } = this.props;
    const user = review.user || {};

    return (
      <div className="review-box clearfix">
        <label className="col-sm-2 user-avatar">
          <img src={user.avatar} className="img-circle img-responsive"/>
        </label>
        <div className="col-sm-10 comment-box">
          <p className="review-content">
            {ReactEmoji.emojify(review.comment)}
          </p>
          <BlockStars
            name={'review1'}
            value={review.rate} editing={false}/>
          <span className="pull-right timestamp">
            {user.fullName}
            {' - '}
            <FormattedDate
            value={new Date(review.updatedAt)}
            year='numeric'
            month='long'
            day='2-digit'
          /></span>
        </div>
      </div>
    )
  }
}

BlockShopUserReview.propTypes = {
  review: PropTypes.object.isRequired
};
