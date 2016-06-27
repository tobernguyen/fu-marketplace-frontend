import React, { Component } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { getItemCategories } from 'app/actions/item';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  deleteShopItem,
  removeShopItemFromList,
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
    if (this.state.toBeUpdatedItem === null && sellingItems && sellingItems.length > 0) {
      // Filter by item and and get first item
      const toBeUpdatedItem = _.head(_.filter(sellingItems, (o) => {
        return o.id === this.state.toBeUpdatedItemID
      }));

      this.setState({
        toBeUpdatedItem: toBeUpdatedItem
      });

      this.props.setToBeUpdatedItem(toBeUpdatedItem);
    }

    // Get categories for item to select
    this.props.getItemCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemDeleted) {
      this.props.removeShopItemFromList(this.state.toBeUpdatedItemID);
      this.props.router.push(`/shops/${this.props.params.shopID}/dashboard`);
    }

    if (nextProps.itemUpdated) {
      this.props.router.push(`/shops/${this.props.params.shopID}/dashboard`);
      this.props.resetUpdatedItemStatus();
    }

    if (this.state.toBeUpdatedItem === null && nextProps.sellingItems && nextProps.sellingItems.length > 0) {
      const toBeUpdatedItem = _.head(_.filter(nextProps.sellingItems, (o) => {
        return o.id === this.state.toBeUpdatedItemID
      }));
      this.setState({
        toBeUpdatedItem: toBeUpdatedItem
      });
      this.props.setToBeUpdatedItem(toBeUpdatedItem);
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
  removeShopItemFromList,
  setToBeUpdatedItem,
  updateShopItem,
  resetUpdatedItemStatus
})(UpdateShopItem))
