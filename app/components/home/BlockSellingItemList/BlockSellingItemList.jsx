import React, { Component, PropTypes } from 'react';
import BlockSellingItem from 'app/components/home/BlockSellingItem';
import './BlockSellingItemList.scss';
import { Pagination } from 'react-bootstrap';

export default class BlockSellingItemList extends Component {

  render() {
    const { items } = this.props;
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
          {items.map((item) => {
            return <BlockSellingItem key={item.id} item={item} shopID={this.props.shopID} />
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

BlockSellingItemList.propTypes = {
  items: PropTypes.array.isRequired
};
