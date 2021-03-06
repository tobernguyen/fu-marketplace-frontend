import React, { Component, PropTypes } from 'react';
import './BlockItemList.scss';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { messages } from './BlockItemList.i18n';


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
          <FormattedMessage {...messages.category} />
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
              className={classNames('btn', 'btn-default', 'col-lg-6 col-md-12', { active: categoryID === undefined })}>
              <FormattedMessage {...messages.all} /> <span className="badge">{totalCategory}</span>
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
                className={classNames('btn', 'btn-default', 'col-lg-6 col-md-12', { active: categoryID && categoryID === category.id })}>
                <span>{category.name}</span> <span className="badge">{categoryCounter[category.id] || 0}</span>
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
