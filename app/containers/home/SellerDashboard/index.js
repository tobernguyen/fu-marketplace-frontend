import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import SellingItemList from '../SellingItemList';

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleUploadCover = (files) => {
      if (files && files[0]) {
        let formFileData = new FormData();
        formFileData.append('file', files[0]);
        // this.props.uploadIdentityPhoto(formFileData)
      }
    }
  }

  render() {
    return (
      <div className="seller-dashboard">
        <div className="col-md-9">
          <div className="row">
            <BlockShopHeader onCoverChange={this.handleUploadCover} />
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
