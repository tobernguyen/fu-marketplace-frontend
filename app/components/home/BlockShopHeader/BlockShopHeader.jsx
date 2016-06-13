import React, { Component, PropTypes } from 'react';
import './BlockShopHeader.scss';

export default class BlockShopHeader extends Component {
  render() {
    return (
      <div className="block-shop-header clearfix">
        <div className="shop-cover">
          <img src="//media.foody.vn/biz_banner/foody-bannerhome_1000x375_khaisilk-new-635949338423039610.png"/>
          <div className="shop-info-wrapper col-md-12">
            <div className="shop-avatar-wrapper row">
              <div className="col-sm-3 shop-avatar">
                  <img src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p160x160/1743702_1584326138447153_1156450258906196077_n.jpg?oh=2a85bb81a677cc086314e0ee194bb9d6&oe=5800EF53"/>
              </div>
            </div>
          </div>
          <div className="col-md-12 shop-nav-wrapper">
            <div className="row">
              <div className="col-md-3 col-md-offset-3">
                <div className="row shop-basic-info">
                  <h4 className="title">Banh My Bay</h4>
                  <span className="status"><i className="fa fa fa-circle"/> Đang mở cửa</span>
                </div>
              </div>
              <div className="col-md-3">
                <ul className="nav shop-info">
                  <li><i className="fa fa-map-marker" /> Phòng C305</li>
                  <li><i className="fa fa-mobile" /> 01262338766</li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="nav shop-info">
                  <li><i className="fa fa-envelope-o" /> hieutdse02289</li>
                  <li><i className="fa fa-facebook-official" /> hyhy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
