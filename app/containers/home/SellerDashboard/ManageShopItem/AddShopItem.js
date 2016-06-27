import React, { Component } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { connect } from 'react-redux';
import { createShopItem, resetUpdatedItemStatus } from 'app/actions/shop';
import { getItemCategories } from 'app/actions/item';
import { withRouter } from 'react-router';


class AddShopItem extends Component {
  constructor(props) {
    super(props);

    this.handleAddShopItem = (formValues) => {
      this.props.createShopItem(formValues, this.props.params.shopID);
    }
  }

  componentWillMount() {
    this.props.getItemCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newlyItemAdded) {
      this.props.router.push(`/shops/${this.props.params.shopID}/dashboard`);
      this.props.resetUpdatedItemStatus();
    }
  }

  render() {
    return (
      <ManageShopItemForm onSubmit={this.handleAddShopItem} shopID={this.props.params.shopID} />
    );
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    newlyItemAdded: shop.newlyItemAdded,
    sellingItems: shop.sellingItems
  }
};

export default withRouter(connect(mapStateToProps, {
  createShopItem,
  getItemCategories,
  resetUpdatedItemStatus
})(AddShopItem))
