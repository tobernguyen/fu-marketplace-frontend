import React, { Component, PropTypes } from 'react';
import BlockStars from '../BlockStars';

export default class BlockShopUserReview extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="review-box clearfix">
        <label className="col-sm-2 user-avatar">
          <img src={currentUser.avatar} className="img-circle img-responsive"/>
        </label>
        <div className="col-sm-10 comment-box">
          <p className="review-content">
            Đồ ăn ngon, ship nhanh.
          </p>
          <BlockStars
            name={'review1'}
            value={2} editing={false}/>
          <span className="pull-right timestamp">{currentUser.fullName} - Jul 7, 2014</span>
        </div>
      </div>
    )
  }
}

BlockShopUserReview.propTypes = {
  currentUser: PropTypes.object.isRequired
};
