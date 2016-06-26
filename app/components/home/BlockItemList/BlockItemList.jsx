import React, { Component } from 'react';
import './BlockItemList.scss';

export default class BlockItemList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="block-item-list block">
        <h3 className="title">
          <span>Thể loại</span>
        </h3>
        <div className="clearfix body">
          <ul className="nav menu">
          {categories.map(category =>
            <li key={category.id } className="item">
              <a href="#">
                <span>{category.name}</span>
                <div>{category.description || 'Chưa có gì cả...'}</div>
              </a>
            </li>
          )}
          </ul>
        </div>
      </div>
    );
  }
}

