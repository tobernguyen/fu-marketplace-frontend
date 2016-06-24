import React, { Component, PropTypes } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { getItemCategories } from 'app/actions/item';
import { deleteShopItem, removeShopItemFromList } from 'app/actions/shop';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';

class UpdateShopItem extends Component {
  constructor(props) {
    super(props);

    const { shopID, itemID } = this.props.params;

    this.state = {
      toBeUpdatedItem: parseInt(itemID)
    };

    this.handleUpdateShopItem = (formValues) => {
      console.log(formValues);
    };

    this.handleDeleteShopItem = () => {
      if (confirm("Are you sure to delete this item?")) {
        this.props.deleteShopItem(shopID, itemID);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemUpdated) {
      this.props.removeShopItemFromList(this.state.toBeUpdatedItem);
      this.props.router.push(`/shops/${this.props.params.shopID}/dashboard`);
    }
  }

  componentWillMount() {
    this.props.getItemCategories();
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
    itemUpdated: shop.itemUpdated
  }
};

export default withRouter(connect(mapStateToProps, {
  getItemCategories,
  deleteShopItem,
  removeShopItemFromList
})(UpdateShopItem))
