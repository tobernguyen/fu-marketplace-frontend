import React, { Component, PropTypes } from 'react';
import './BlockShopReviews.scss';

export default class BlockShopReviews extends Component {
  render() {
    const { shop, seller } = this.props;
    console.log(shop, seller);
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


      </div>
    )
  }
}

BlockShopReviews.propTypes = {
  shop: PropTypes.object.isRequired,
  seller: PropTypes.object.isRequired
};
