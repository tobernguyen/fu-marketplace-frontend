import React, { Component, PropTypes } from 'react';
import './BlockShopFeedItem.scss';

export default class BlockShopFeedItem extends Component {
  render() {
    return (
      <div className="block row block-shop-feed-item">
        <div className="col-md-4 col-sm-4">
          <div className="row thumbnail">
            <img src="http://mcg.matart.ru/01.Default/html/img/pl3.jpg" className="img-responsive"/>
          </div>
        </div>
        <div className="col-md-8 col-sm-8">
          <div className="row content">
            <h3>Bánh mỳ Kebab</h3>
            <div className="category">
              <ul className="nav">
                <li>
                  <a href="#">Đồ ăn</a>
                </li>
                <li>
                  <a href="#">Đồ uống</a>
                </li>
                <li>
                  <a href="#">Cơm</a>
                </li>
              </ul>
            </div>
            <div className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </div>
            <div className="ship-dorms">
              <ul className="nav">
                <li><a href="#">A</a></li>
                <li><a href="#" className="active">B</a></li>
                <li><a href="#">D</a></li>
                <li><a href="#">E</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
