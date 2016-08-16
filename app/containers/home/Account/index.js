import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import { updateUserInfo, uploadAvatar, resetUpdateStatus } from 'app/actions/user';
import { updateModalSize } from 'app/actions/common';
import AccountBasicForm from './AccountBasicForm';
import { injectIntl, intlShape } from 'react-intl';

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
  }

  componentWillMount() {
    this.props.updateModalSize(null);
    this.props.resetUpdateStatus();
  }

  render() {
    let roomList = [];
    for (let dorm of ['A', 'B', 'C', 'D', 'E', 'F']) {
      for (let floor of [1, 2, 3, 4, 5]) {
        for (let floorRoomNo = 1; floorRoomNo <= 14; floorRoomNo ++) {
          const roomNo = `${dorm}${floor * 100 + floorRoomNo}`;
          roomList.push({
            value: roomNo,
            label: roomNo
          });
        }
      }
    }

    const { formatMessage } = this.props.intl;
    return (
      <div>
        <ModalHeader query={this.props.query}
                     title={formatMessage({ id: 'account.header.title', defaultMessage: 'Account' })}
                     subHeader={formatMessage({ id: 'account.header.subTitle', defaultMessage: 'Change basic information' })}/>
        <div className="modal-body">
          <AccountBasicForm
            userUpdateStatus={this.props.userUpdateStatus}
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
  const { user, common } = state;
  return {
    currentUser:      user.currentUser,
    userUpdateStatus: user.userUpdateStatus,
    query:            common.query
  }
};

Account.propTypes = {
   intl: intlShape.isRequired
};

export default injectIntl(connect(mapStateToProps, {
  uploadAvatar,
  updateUserInfo,
  updateModalSize,
  resetUpdateStatus
})(Account))
