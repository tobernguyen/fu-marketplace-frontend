import React, { Component, PropTypes } from 'react';
import './BlockShopReviews.scss';
import BlockStars from '../BlockStars';

export default class BlockShopReviews extends Component {
  render() {
    const { shop, seller, currentUser } = this.props;
    console.log(currentUser);
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
        <div className="row third-row">
          <div className="col-sm-12">
            <ul className="nav statistics">
              <li>
                <span>245</span>
                <cite>
                  Success orders
                </cite>
              </li>
              <li>
                <span>3.5</span>
                <cite>
                  Avg. serving time
                </cite>
              </li>
              <li>
                <span>24</span>
                <cite>
                  Selling items
                </cite>
              </li>
              <li>
                <span>24</span>
                <cite>
                  Bookmarked
                </cite>
              </li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="row second-row">
          <div className="col-sm-12">
            <ul className="group-info nav">
              <li>
                <span><i className="fa fa-user"/></span>
                <cite>{seller.fullName}</cite>
              </li>
              <li>
                <span><i className="fa fa-flag"/></span>
                <cite>{shop.address}</cite>
              </li>
              <li>
                <span><i className="fa fa-phone"/></span>
                <cite>01262338766</cite>
              </li>
              <li>
                <span><i className="fa fa-facebook"/></span>
                <cite>Hieu Tran</cite>
              </li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="row reviews-row">
          <div className="col-sm-offset-2 col-sm-8">
            <div className="review-box clearfix">
              <label className="col-sm-2 user-avatar" htmlFor="input-review">
                <img src={currentUser.avatar} className="img-circle img-responsive"/>
              </label>
              <div className="col-sm-10 comment-box">
                <textarea id="input-review" className="form-control input-review" placeholder="Review (optional)"/>
                <BlockStars
                  name={'review'}
                  value={2} />
                <span className="pull-right">156 characters left</span>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row all-reviews">
          <div className="col-sm-offset-2 col-sm-8">
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
                <span className="pull-right timestamp">Son Hoang - Jul 7, 2014</span>
              </div>
            </div>
            <div className="review-box clearfix">
              <label className="col-sm-2 user-avatar">
                <img src={currentUser.avatar} className="img-circle img-responsive"/>
              </label>
              <div className="col-sm-10 comment-box">
                <p className="review-content">
                  Đồ ăn ngon, ship nhanh.
                </p>
                <BlockStars
                  name={'review2'}
                  value={2} editing={false}/>
                <span className="pull-right timestamp">Son Hoang - Jul 7, 2014</span>
              </div>
            </div>
            <div className="review-box clearfix">
              <label className="col-sm-2 user-avatar">
                <img src={currentUser.avatar} className="img-circle img-responsive"/>
              </label>
              <div className="col-sm-10 comment-box">
                <p className="review-content">
                  Đồ ăn ngon, ship nhanh.
                </p>
                <BlockStars
                  name={'review3'}
                  value={2} editing={false}/>
                <span className="pull-right timestamp">Son Hoang - Jul 7, 2014</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

BlockShopReviews.propTypes = {
  shop: PropTypes.object.isRequired,
  seller: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};
