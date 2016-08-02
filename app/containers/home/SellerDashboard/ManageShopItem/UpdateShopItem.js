import React, { Component } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { getItemCategories } from 'app/actions/item';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  deleteShopItem,
  setToBeUpdatedItem,
  updateShopItem,
  resetUpdatedItemStatus
} from 'app/actions/shop';


class UpdateShopItem extends Component {
  constructor(props) {
    super(props);

    const { shopID, itemID } = this.props.params;

    this.state = {
      toBeUpdatedItemID: parseInt(itemID),
      toBeUpdatedItem: null
    };

    this.handleUpdateShopItem = (formValues) => {
      const itemID = formValues.id;
      if (!isNaN(itemID)) {
        this.props.updateShopItem(shopID, itemID, formValues);
      }
    };

    this.handleDeleteShopItem = () => {
      if (confirm('Are you sure to delete this item?')) {
        this.props.deleteShopItem(shopID, itemID);
      }
    };
  }

  componentWillMount() {
    const { sellingItems } = this.props;
    if (this.state.toBeUpdatedItem === null && sellingItems) {
      let items = _.flatten(_.toArray(sellingItems));
      if (items.length > 0) {
        const toBeUpdatedItem = _.head(_.filter(items, (o) => {
          return o.id === this.state.toBeUpdatedItemID
        }));

        this.setState({
          toBeUpdatedItem: toBeUpdatedItem
        });
        this.props.setToBeUpdatedItem(toBeUpdatedItem);
      }
    }

    // Get categories for item to select
    this.props.getItemCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemDeleted || nextProps.itemUpdated) {
      this.props.router.push(`/dashboard/shops/${this.props.params.shopID}`);
      this.props.resetUpdatedItemStatus();
    }

    if (this.state.toBeUpdatedItem === null && nextProps.sellingItems) {
      let items = _.flatMap(nextProps.sellingItems);
      if (items.length > 0) {
        const toBeUpdatedItem = _.find(items, (o) => {
          return o.id === this.state.toBeUpdatedItemID
        });
        this.setState({
          toBeUpdatedItem: toBeUpdatedItem
        });
        this.props.setToBeUpdatedItem(toBeUpdatedItem);
      }
    }
  }


  render() {
    return (
      <ManageShopItemForm
        onSubmit={this.handleUpdateShopItem}
        onDelete={this.handleDeleteShopItem}
        shopID={this.props.params.shopID}
        updateMode={true} />
    );
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    itemDeleted: shop.itemDeleted,
    itemUpdated: shop.itemUpdated,
    sellingItems: shop.sellingItems
  }
};

export default withRouter(connect(mapStateToProps, {
  getItemCategories,
  deleteShopItem,
  setToBeUpdatedItem,
  updateShopItem,
  resetUpdatedItemStatus
})(UpdateShopItem))
