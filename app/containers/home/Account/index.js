import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import { updateUserInfo, uploadAvatar } from 'app/actions/user';
import { updateModalMode, updateModalSize } from 'app/actions/common';
import AccountBasicForm from './AccountBasicForm';

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleUploadAvatar = (avatarDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(avatarDataURL));
      this.props.uploadAvatar(formFileData);
    };

    this.handleUpdateAccount = (formValues) => {
      this.props.updateUserInfo(formValues);
    };

    this.handleUploadAvatar = (avatarDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(avatarDataURL));
      this.props.uploadAvatar(formFileData);
    };
  }

  componentWillMount() {
    this.props.updateModalSize(null);
    this.props.updateModalMode(true);
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    let roomList = [];
    for (let dorm of ['A', 'B', 'C', 'D', 'E', 'F']) {
      for (let floor of [1, 2, 3, 4]) {
        for (let floorRoomNo = 1; floorRoomNo <= 14; floorRoomNo ++) {
          const roomNo = `${dorm}${floor * 100 + floorRoomNo}`;
          roomList.push({
            value: roomNo,
            label: roomNo
          });
        }
      }
    }
    return (
      <div>
        <ModalHeader title="Tài khoản" subHeader="Thay đổi thông tin cơ bản."/>
        <div className="modal-body">
          <AccountBasicForm
            currentUser={this.props.currentUser}
            uploadAvatar={this.handleUploadAvatar}
            roomList={roomList}
            onSubmit={this.handleUpdateAccount} />
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
  updateUserInfo,
  updateModalSize,
  updateModalMode
})(Account)
