import React, { Component, PropTypes } from 'react';
import ManageShopItemForm from './ManageShopItemForm';
import { connect } from 'react-redux';
import { createShopItem } from 'app/actions/shop';
import { getItemCategories } from 'app/actions/item';
import { withRouter } from 'react-router';


class AddShopItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalItems: 0
    };

    this.handleAddShopItem = (formValues) => {
      this.props.createShopItem(formValues, this.props.params.shopID);
    }
  }

  componentWillMount() {
    this.props.getItemCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellingItems) {
      if (nextProps.sellingItems.length > this.state.totalItems) {
        this.setState({
          totalItems: nextProps.sellingItems.length
        });
        this.props.router.push(`/shops/${this.props.params.shopID}/dashboard`);
      }
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
    sellingItems: shop.sellingItems
  }
};

export default withRouter(connect(mapStateToProps, {
  createShopItem,
  getItemCategories
})(AddShopItem))
