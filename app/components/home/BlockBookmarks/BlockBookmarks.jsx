import React, { Component, PropTypes } from 'react';
import './BlockBookmarks.scss';

export default class BlockBookmarks extends Component {
  render() {
    return (
      <div className="block-bookmark block">
        <h3 className="title">
          <span>Bookmarks</span>
        </h3>
        <div className="clearfix body">
          <ul className="nav bookmark-items">
            <li>
              <a href="#">
                <img
                  src="http://image.mp3.zdn.vn/thumb/94_94/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1426739987.jpg"
                  alt="Item"
                  width={50}
                />
              </a>
              <h3 className="item-title">
                <a href="#">Bánh Mỳ Dân tổ</a>
              </h3>
            </li>
            <li>
              <a href="#">
                <img
                  src="http://image.mp3.zdn.vn/thumb/94_94/avatars/0/0/0096a669f924698739bbf2d9a34f24f4_1463022228.png"
                  alt="Item"
                  width={50}
                />
              </a>
              <h3 className="item-title">
                <a href="#">Mỳ tôm Bảo </a>
              </h3>
            </li>
            <li>
              <a href="#">
                <img
                  src="http://image.mp3.zdn.vn/thumb/94_94/avatars/0/1/01c1b5c0c56a10d1fd3eb2a9693f47a9_1463850973.jpg"
                  alt="Item"
                  width={50}
                />
              </a>
              <h3 className="item-title">
                <a href="#">C-Barkery</a>
              </h3>
            </li>
            <li>
              <a href="#">
                <img
                  src="http://image.mp3.zdn.vn/thumb/94_94/avatars/e/e/ee4337c1a8831c90c2d8966d4fee21dd_1464143103.jpg"
                  alt="Item"
                  width={50}
                />
              </a>
              <h3 className="item-title">
                <a href="#">Mỳ tôm trứng Sơn Nguyễn </a>
              </h3>
            </li>
            <li>
              <a href="#">
                <img
                  src="http://image.mp3.zdn.vn/thumb/94_94/avatars/c/9/c9691947125152596eb171eff83a4ce5_1464437719.jpg"
                  alt="Item"
                  width={50}
                />
              </a>
              <h3 className="item-title">
                <a href="#">Oriole Shop</a>
              </h3>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
