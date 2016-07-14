import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UpdateShopForm from './UpdateShopForm';
import { updateShopInfo } from 'app/actions/shop';
import _ from 'lodash';


class UpdateShop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newShopDescription: null,
      shopUpdated: false
    };

    this.handleUpdateShop = (formValues) => {
      this.setState({
        newShopDescription: formValues.description,
        shopUpdated:        false
      });
      const shopData = _.assign({}, formValues, {
        status: Number(formValues.status)
      });

      this.props.updateShopInfo(shopData, this.props.params.shopID);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellerShop && this.state.newShopDescription != null) {
      if (nextProps.sellerShop.description === this.state.newShopDescription) {
        this.setState({
          shopUpdated: true
        })
      }
    }
  }

  render() {
    return (
      <UpdateShopForm
        onSubmit={this.handleUpdateShop}
        shopID={this.props.params.shopID}
        shopUpdated={this.state.shopUpdated}
        formSubmitting={this.props.formSubmitting} />
    );
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    sellerShop: shop.sellerShop,
    formSubmitting: shop.formSubmitting
  }
};

UpdateShop.propTypes = {
  updateShopInfo: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  updateShopInfo
})(UpdateShop)
