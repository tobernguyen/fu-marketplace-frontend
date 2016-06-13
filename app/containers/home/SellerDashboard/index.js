import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import SellingItemList from '../SellingItemList';

class SellerDashboard extends Component {
  render() {
    return (
      <div className="seller-dashboard">
        <div className="col-md-9">
          <div className="row">
            <BlockShopHeader />
            <SellingItemList />
          </div>
        </div>
        <div className="col-md-3">
          Sidebar
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  }
};

export default connect(mapStateToProps, {

})(SellerDashboard)
