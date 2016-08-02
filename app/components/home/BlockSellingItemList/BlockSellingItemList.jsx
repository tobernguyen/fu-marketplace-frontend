import React, { Component, PropTypes } from 'react';
import BlockSellingItem from 'app/components/home/BlockSellingItem';
import BlockSellingItemForUser from 'app/components/home/BlockSellingItemForUser';
import BlockShoppingCart from 'app/components/home/BlockShoppingCart';
import './BlockSellingItemList.scss';
import _ from 'lodash';
import classNames from 'classnames';
import { messages } from './BlockSellingItemList.i18n';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

class BlockSellingItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupItems: {},
      currentItems: [],
      selectedCategory: -1
    };

    this.handleCheckOut = () => {
      const { cartItems } = this.props;
      if (cartItems.length) {
        this.props.checkOut();
      }
    };

    this.categoryChanged = (categoryID) => {
      this.setState({
        currentItems:     this.state.groupItems[categoryID],
        selectedCategory: categoryID
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps;
    if (items) {
      if (_.isEmpty(items)) {
        this.setState({
          groupItems: {},
          currentItems: [],
          selectedCategory: -1
        });
      } else {
        const { selectedCategory } = this.state;
        const firstKey = _.keys(items)[0];
        this.setState({
          groupItems: items,
          currentItems: selectedCategory === -1 ? items[firstKey] : items[selectedCategory]
        });

        if (selectedCategory === -1) {
          this.setState({
            selectedCategory: firstKey
          })
        }
      }
    }
  }

  renderHeader() {
    const { allCategories, items, sellerMode, isFetchingItems } = this.props;
    const { formatMessage } = this.props.intl;
    const categories = _.map(items, (value, key) => ({
      id: key,
      itemCount: value.length
    }));

    return (
      <ul className="nav nav-pills">
        {categories.map((category, index) => {
          const isActive = category.id === this.state.selectedCategory;
          return (
            <li key={category.id} className={classNames({'active': isActive})}>
              <a onClick={() => this.categoryChanged(category.id)}>
                {category.id == 0 ? formatMessage(messages.all) : allCategories[category.id]}
                {' '}
                <span>{category.itemCount}</span></a>
            </li>
          )
        })}
        {(sellerMode && isFetchingItems) && <li>
          <a><i className="fa fa-refresh fa-spin" /></a>
        </li>}
      </ul>
    )
  }

  renderSellingItems() {
    const { currentItems } = this.state;
    const { sellerMode, addToCart, buyNow, shopID, cartItems, shopOpening, ownerView, toggleItemStatus } = this.props;
    if (currentItems.length > 0) {
      return (
        <div>
          {this.state.currentItems.map((item) =>
            {if (sellerMode || ownerView) {
              return <BlockSellingItem
                toggleItemStatus={toggleItemStatus}
                sellerMode={sellerMode}
                key={item.id}
                item={item}
                shopID={shopID} />
            } else {
              return <BlockSellingItemForUser
                shopOpening={shopOpening}
                key={item.id}
                item={item}
                addToCard={addToCart}
                buyNow={buyNow}
                shopID={shopID}
                cartItems={cartItems} />
            }}
          )}
        </div>
      )
    } else {
      return (
        <div className={classNames('no-item', { seller: sellerMode })}>
          <p className="message">
            {sellerMode && <span>
              <FormattedMessage {...messages.noItem.seller} />
            </span>}
            {!sellerMode && <span>
              <FormattedMessage {...messages.noItem.user} />
            </span>}
          </p>
        </div>
      )
    }
  }

  render() {
    const { sellerMode, shopOpening, ownerView } = this.props;
    return (
      <div className="block-selling-item-list clearfix">
        <div className="header clearfix">
          <div className={classNames({'col-md-9 col-xs-8': !sellerMode})}>
            {this.renderHeader()}
          </div>
          {(!sellerMode && shopOpening && !ownerView) && <div className="col-md-3 col-xs-4 row">
            <BlockShoppingCart cartItems={this.props.cartItems} checkOut={this.handleCheckOut} />
          </div>}
        </div>
        <div className="body clearfix">
          {this.renderSellingItems()}
        </div>
      </div>
    )
  }
}

BlockSellingItemList.propTypes = {
  items: PropTypes.object.isRequired,
  sellerMode: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(BlockSellingItemList);
