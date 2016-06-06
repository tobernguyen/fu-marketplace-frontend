import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import AccountBasic from 'app/components/home/AccountBasic';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import { uploadAvatar } from '../../actions';

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleUploadAvatar = (avatarDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(avatarDataURL));
      this.props.uploadAvatar(formFileData);
    }
  }

  render() {
    return (
      <div>
        <ModalHeader title="Tài khoản" subHeader="Thay đổi thông tin cơ bản."/>
        <div className="modal-body">
          <AccountBasic currentUser={this.props.currentUser} uploadAvatar={this.handleUploadAvatar} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { user } = state;
  return {
    currentUser: user.currentUser
  }
};

export default connect(mapStateToProps, {
  uploadAvatar
})(Account)
