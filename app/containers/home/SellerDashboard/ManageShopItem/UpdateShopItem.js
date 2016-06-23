import React, { Component, PropTypes } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { getItemCategories } from 'app/actions/item';
import { deleteShopItem } from 'app/actions/shop';

import { connect } from 'react-redux';

class UpdateShopItem extends Component {
  constructor(props) {
    super(props);

    const { shopID, itemID } = this.props.params;

    this.handleUpdateShopItem = (formValues) => {
      console.log(formValues);
    };

    this.handleDeleteShopItem = () => {
      if (confirm("Are you sure to delete this item?")) {
        this.props.deleteShopItem(shopID, itemID);
      }
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
  return {

  }
};

export default connect(mapStateToProps, {
  getItemCategories,
  deleteShopItem
})(UpdateShopItem)
