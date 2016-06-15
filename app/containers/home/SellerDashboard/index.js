import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import SellingItemList from '../SellingItemList';
import { uploadShopAvatar, uploadShopCover } from 'app/actions/shop';

class SellerDashboard extends Component {
  constructor(props) {
    super(props);

    this.handleUploadShopAvatar = (avatarDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(avatarDataURL));
      this.props.uploadShopAvatar(formFileData, 1);
    };

    this.handleUploadShopCover = (coverDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(coverDataURL));
      this.props.uploadShopCover(formFileData, 1);
    }
  }

  render() {
    return (
      <div className="seller-dashboard">
        <div className="col-md-9">
          <div className="row">
            <BlockShopHeader
              uploadShopCover={this.handleUploadShopCover}
              uploadShopAvatar={this.handleUploadShopAvatar} />
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
  uploadShopAvatar,
  uploadShopCover
})(SellerDashboard)
