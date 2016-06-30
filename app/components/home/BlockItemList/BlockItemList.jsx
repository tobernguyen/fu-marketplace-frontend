import React, { Component, PropTypes } from 'react';
import './BlockItemList.scss';

export default class BlockItemList extends Component {
  render() {
    const { categories, categoryCounter, totalCategory } = this.props;
    return (
      <div className="block-item-list block">
        <h3 className="title">
          <span>Thể loại</span>
        </h3>
        <div className="clearfix body">
          <div className="category-list">
            <a href="#" className="btn btn-default">
              Tất cả <span className="badge">{totalCategory}</span>
            </a>
          {categories.map(category =>
            <a key={category.id} href="#" className="btn btn-default">
              {category.name} <span className="badge">{categoryCounter[category.id]}</span>
            </a>
          )}
          </div>
        </div>
      </div>
    );
  }
}

BlockItemList.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryCounter: PropTypes.object.isRequired,
  totalCategory: PropTypes.number.isRequired
};
