import React, { Component, PropTypes } from 'react';
import './BlockItemList.scss';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';

export default class BlockItemList extends Component {
  render() {
    const { categories, categoryCounter, totalCategory, query } = this.props;
    let categoryID;
    if (query && query.hasOwnProperty('category')) {
      categoryID = parseInt(query.category);
    }
    return (
      <div className="block-item-list block">
        <h3 className="title">
          <span>Thể loại</span>
        </h3>
        <div className="clearfix body">
          <div className="category-list">
            <Link
              to={{
                    pathname: '/',
                    query: _.assign({}, query, {
                      category: undefined
                    })
                  }}
              className={classNames('btn', 'btn-default', { active: categoryID === undefined })}>
              Tất cả <span className="badge">{totalCategory}</span>
            </Link>
            {categories.map(category =>
              <Link
                key={category.id}
                to={{
                    pathname: '/',
                    query: _.assign({}, query, {
                      category: category.id
                    })
                  }}
                className={classNames('btn', 'btn-default', { active: categoryID && categoryID === category.id })}>
                {category.name} <span className="badge">{categoryCounter[category.id]}</span>
              </Link>
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
