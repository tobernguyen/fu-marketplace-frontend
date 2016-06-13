import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormEditShopInformation from 'app/components/admin/FormEditShopInformation';
import FormEditShopBanStatus from 'app/components/admin/FormEditShopBanStatus';
import {
  adminGetShop,
  adminUpdateShopInformation,
  adminBanShop,
  adminUnbanShop
} from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerEditShop extends Component {
  constructor(props) {
    super(props);
    
    this.handleSubmitShopInformation = this.handleSubmitShopInformation.bind(this);
    this.banShop = this.banShop.bind(this);
    this.unbanShop = this.unbanShop.bind(this);
  }
  
  handleSubmitShopInformation(shop) {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUpdateShopInformation(shopId, shop);
  }
  
  banShop() {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminBanShop(shopId);
  }
  
  unbanShop() {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUnbanShop(shopId);
  }
  
  componentWillMount() {
    this.props.adminGetShop(this.props.params.shopId);
  }
  render() {
    const { shopManagement } = this.props;
    if(shopManagement.isFetching) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return (
       <div className="container-fluid">
        <FormEditShopInformation
          onSubmit={this.handleSubmitShopInformation}
          submitResult={shopManagement.submitResult}
        />
        <hr />
        <FormEditShopBanStatus
          shop={shopManagement.selectedShop}
          adminBanShop={this.banShop}
          adminUnbanShop={this.unbanShop}
          submitResult={shopManagement.submitResult}
          isSubmitting={shopManagement.isSubmitting}
        />
       </div>
      );
    }
  }
}

ContainerEditShop.path = ':shopId/edit';
ContainerEditShop.title = 'Shop edit';
ContainerEditShop.description = 'Edit shop information/Ban shop';
ContainerEditShop.faIcon = 'fa-shopping-bag';

const mapStateToProps = (state) => ({
  shopManagement: state.admin.shopManagement
});

export default connect(mapStateToProps, {
  adminGetShop,
  adminUpdateShopInformation,
  adminBanShop,
  adminUnbanShop
})(ContainerEditShop);

