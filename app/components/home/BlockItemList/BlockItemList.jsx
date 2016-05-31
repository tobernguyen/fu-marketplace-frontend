import React, { Component } from 'react';
import './BlockItemList.scss';

export default class BlockItemList extends Component {
  render() {
    return (
      <div className="block-item-list block">
        <h3 className="title">
          <span>Thể loại</span>
        </h3>
        <div className="clearfix body">
          <ul className="nav menu">
            <li className="item">
              <a href="#">
                <span>Đồ ăn nhanh</span>
                <div>24 gian hàng, 59 sản phẩm</div>
              </a>
            </li>
            <li className="item">
              <a href="#">
                <span>Đồ uống</span>
                <div>54 gian hàng, 159 sản phẩm</div>
              </a>
            </li>
            <li className="item">
              <a href="#">
                <span>Dịch vụ giặt</span>
                <div>4 gian hàng</div>
              </a>
            </li>
            <li className="item">
              <a href="#">
                <span>Dịch vụ in ấn</span>
                <div>3 gian hàng</div>
              </a>
            </li>
            <li className="item">
              <a href="#">
                <span>Phụ kiện điện thoại</span>
                <div>34 gian hàng, 129 sản phẩm</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

