import React, { PropTypes } from 'react';
import ShopList from 'app/components/admin/ShopList';
import { connect } from 'react-redux';
import { adminGetShops } from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerListShop extends React.Component {
  componentWillMount() {
    this.props.adminGetShops();
  }
  
  render() {
    const { isFetching, shopList } = this.props.shopManagement;
    if(isFetching) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return <ShopList shops={shopList} />;
    }
  }
}

const mapStateToProps = (state) => ({
  shopManagement: state.admin.shopManagement
});

ContainerListShop.path = '/shops';
ContainerListShop.title = 'Shop management';
ContainerListShop.description = 'Shop management';
ContainerListShop.faIcon = 'fa-shopping-bag';


export default connect(mapStateToProps, {
  adminGetShops
})(ContainerListShop);