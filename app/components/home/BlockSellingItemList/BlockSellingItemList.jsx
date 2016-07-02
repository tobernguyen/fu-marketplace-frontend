import React, { Component, PropTypes } from 'react';
import BlockSellingItem from 'app/components/home/BlockSellingItem';
import BlockSellingItemForUser from 'app/components/home/BlockSellingItemForUser';
import BlockShoppingCart from 'app/components/home/BlockShoppingCart';
import './BlockSellingItemList.scss';
import _ from 'lodash';
import classNames from 'classnames';

export default class BlockSellingItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupItems: {},
      currentItems: []
    };
    
    this.handleCheckOut = () => {
      const { cartItems } = this.props;
      if (cartItems.length) {
        this.props.checkOut();
      }
    };

    this.categoryChanged = (categoryID) => {
      this.setState({
        currentItems: this.state.groupItems[categoryID]
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && !_.isEmpty(nextProps.items)) {
      this.setState({
        groupItems: nextProps.items,
        currentItems: _.find(nextProps.items)
      })
    }
  }

  renderHeader() {
    const { allCategories, items } = this.props;
    const categories = _.map(items, (value, key) => ({
      id: key,
      itemCount: value.length
    }));

    return (
      <ul className="nav nav-pills">
        {categories.map(category =>
          <li key={category.id}>
            <a onClick={() => this.categoryChanged(category.id)}>
              {allCategories[category.id]}{' '}
              <span>{category.itemCount}</span></a>
          </li>
        )}
      </ul>
    )
  }

  render() {
    const { sellerMode } = this.props;

    return (
      <div className="block-selling-item-list clearfix">
        <div className="header clearfix">
          <div className={classNames({'col-md-9 col-xs-8': !sellerMode})}>
            {this.renderHeader()}
          </div>
          {!sellerMode && <div className="col-md-3 col-xs-4 row">
            <BlockShoppingCart cartItems={this.props.cartItems} checkOut={this.handleCheckOut} />
          </div>}
        </div>
        <div className="body clearfix">
          {this.state.currentItems.map((item) =>
          {if (sellerMode) {
            return <BlockSellingItem
              key={item.id}
              item={item}
              shopID={this.props.shopID} />
          } else {
            return <BlockSellingItemForUser
              key={item.id}
              item={item}
              addToCard={this.props.addToCart}
              buyNow={this.props.buyNow}
              shopID={this.props.shopID}
              cartItems={this.props.cartItems} />
          }}
          )}
        </div>
      </div>
    )
  }
}

BlockSellingItemList.propTypes = {
  items: PropTypes.object.isRequired,
  sellerMode: PropTypes.bool.isRequired
};
