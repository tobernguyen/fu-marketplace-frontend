import React, { Component, PropTypes } from 'react';
import './BlockShopHeader.scss';

export default class BlockShopHeader extends Component {
  render() {
    return (
      <div className="block-shop-header">
        <div className="shop-cover">
          <img src="//media.foody.vn/biz_banner/foody-bannerhome_1000x375_khaisilk-new-635949338423039610.png"/>
          <div className="shop-info-wrapper">
            <div className="row shop-info">
              <div className="col-sm-3">
                <img className="shop-avatar" src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p160x160/1743702_1584326138447153_1156450258906196077_n.jpg?oh=2a85bb81a677cc086314e0ee194bb9d6&oe=5800EF53"/>
              </div>
              <div className="col-sm-5">
                <div className="shop-name">
                  <h4 className="title">
                    Bánh mỳ bay
                  </h4>
                </div>
              </div>
              <div className="col-sm-4">
                FB/
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
