import React, { Component, PropTypes } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { connect } from 'react-redux';
import { createShopItem } from 'app/actions/shop';

class AddShopItem extends Component {
  constructor(props) {
    super(props);

    this.handleAddShopItem = (formValues) => {
      this.props.createShopItem(formValues, this.props.params.shopID);
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

  }
};

export default connect(mapStateToProps, {
  createShopItem
})(AddShopItem)
