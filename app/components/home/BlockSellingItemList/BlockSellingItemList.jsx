import React, { Component, PropTypes } from 'react';
import BlockSellingItem from 'app/components/home/BlockSellingItem';
import './BlockSellingItemList.scss';
import { Pagination } from 'react-bootstrap';

export default class BlockSellingItemList extends Component {
  render() {
    const data = [1,2,3,4,5,6,7,8];
    return (
      <div className="block-selling-item-list clearfix">
        <div className="header clearfix">
          <ul className="nav nav-pills">
            <li className="active">
              <a href="#">Tất cả <span>8</span></a>
            </li>
            <li>
              <a href="#">Đồ ăn <span>3</span>
              </a>
            </li>
            <li>
              <a href="#">Đồ uống <span>5</span></a>
            </li>
          </ul>
        </div>
        <div className="body clearfix">
          {data.map((item) => {
            return <BlockSellingItem item={item} />
          })}
        </div>
        <div className="footer clearfix">
          <Pagination
            bsSize="small"
            items={5}
            activePage={1} />
        </div>
      </div>
    )
  }
}
