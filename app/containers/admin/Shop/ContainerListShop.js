import React from 'react';
import ShopList from 'app/components/admin/ShopList';
import { connect } from 'react-redux';
import { adminGetShops } from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { withRouter } from 'react-router'

class ContainerListShop extends React.Component {
  constructor(props) {
    super(props);

    const { page, size } = this.props.location.query;

    this.state = {
      page: page || 1,
      size: size || 20
    };

    this.changePageSize = (e) => {
      const size = e.target.value;
      const { query } = this.props.location;
      const page = query.page || 1;
      this.props.router.push(`/admin/shops?page=${page}&size=${size}`);
    }
  }

  componentWillMount() {
    this.props.adminGetShops(this.state.page, this.state.size);
  }

  componentWillReceiveProps(nextProps) {
    const { page, size } = nextProps.location.query;

    if(page != this.state.page || size != this.state.size) {
      this.props.adminGetShops(page, size);
      this.setState({
        page,
        size
      });
    }
  }

  render() {
    const { isFetching, shopList } = this.props.shopManagement;
    const { page, size} = this.state;
    if(isFetching) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return <ShopList shops={shopList} page={page} size={size} changePageSize={this.changePageSize}/>;
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
})(withRouter(ContainerListShop));
