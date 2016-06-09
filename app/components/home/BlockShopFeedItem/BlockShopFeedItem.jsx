import React, { Component, PropTypes } from 'react';
import './BlockShopFeedItem.scss';
import { Link } from 'react-router';

export default class BlockShopFeedItem extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = (e) => {
      const { width, left } = e.target.getBoundingClientRect();
      const cursorPosX = e.clientX - left;

      console.log(cursorPosX);
    };

    this.handleMouseLeave = () => {
      console.log('I have been left');
    }
  }
  render() {
    return (
      <div className="block row block-shop-feed-item">
        <div className="col-md-3 col-sm-4">
          <div className="row thumbnail">
            <Link to='shops/1'>
              <img
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                src="http://mcg.matart.ru/01.Default/html/img/pl3.jpg"
                className="img-responsive"/>
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-sm-8">
          <div className="row content">
            <h3>
              <Link to='shops/1'>
                Bánh mỳ Kebab
              </Link>
            </h3>
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
              <i>Last updated: 23:51 05/06/2016</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
