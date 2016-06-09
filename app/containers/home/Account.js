import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import AccountBasic from 'app/components/home/AccountBasic';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import { uploadAvatar, changeUserInfo, updateUserInfo, updateModalSize } from '../../actions';
import { updateModalMode } from '../../actions/common';

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleUploadAvatar = (avatarDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(avatarDataURL));
      this.props.uploadAvatar(formFileData);
    };

    this.saveUserInfo = (evt) => {
      evt.preventDefault();
      this.props.updateUserInfo(this.props.currentUser);
    }

  }

  componentWillMount() {
    this.props.updateModalSize(null);
    this.props.updateModalMode(true);
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    return (
      <div>
        <ModalHeader title="Tài khoản" subHeader="Thay đổi thông tin cơ bản."/>
        <div className="modal-body">
          <AccountBasic
            currentUser={this.props.currentUser}
            userUpdated={this.props.userUpdated}
            uploadAvatar={this.handleUploadAvatar}
            userInfoChanged={this.props.changeUserInfo}
            saveUserInfo={this.saveUserInfo}/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { user } = state;
  return {
    currentUser:  user.currentUser,
    userUpdated:  user.userUpdated
  }
};

export default connect(mapStateToProps, {
  uploadAvatar,
  changeUserInfo,
  updateUserInfo,
  updateModalSize,
  updateModalMode
})(Account)
