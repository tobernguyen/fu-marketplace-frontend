import React, { Component, PropTypes } from 'react';
import { messages } from './AccountBasic.i18n';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import  ModalCropImage from '../ModalCropImage';
import ImageUploader from 'app/components/common/ImageUploader';
import './AccountBasic.scss';
import './react-select.scss';
import Select from 'react-select';
import { Alert } from 'react-bootstrap';

const AVATAR_SMALL_SIZE_EXT = '-small.jpg';
const AVATAR_MEDIUM_SIZE_EXT = '-medium.jpg';

class AccountBasic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalCropImageShown: false,
      img: null,
      alertVisible: false
    };

    this.handleFileChange = (dataURI) => {
      this.setState({
        modalCropImageShown: true,
        img: dataURI
      })
    };

    this.handleRequestHide = () => {
      this.setState({
        modalCropImageShown: false
      })
    };

    this.phoneChanged = (evt) => {
      const phone = evt.target.value;
      const numericRegex = /^\d+$/;
      if (numericRegex.test(phone)) {
        this.props.userInfoChanged({
          'phone': phone
        })
      }
    };

    this.roomSelected = (room) => {
      const roomNo = room ? room.value : '';
      this.props.userInfoChanged({
        'room': roomNo
      })
    };

    this.handleAlertDismiss = () => {
      this.setState({alertVisible: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        modalCropImageShown: false
      })
    }
    if (nextProps.userUpdated) {
      this.setState({
        alertVisible: nextProps.userUpdated
      })
    }
  }

  render() {
    const { currentUser } = this.props;
    const { formatMessage } = this.props.intl;

    let userAvatar = currentUser.avatar;

    if (userAvatar.endsWith(AVATAR_SMALL_SIZE_EXT)) {
      userAvatar = userAvatar.replace(AVATAR_SMALL_SIZE_EXT, AVATAR_MEDIUM_SIZE_EXT);
    }

    userAvatar += `?${new Date().getTime()}`;

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

    const { fullName, email, room, phone } = currentUser;

    let alert;
    if (this.state.alertVisible) {
      alert = <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
        <p>Your information have been updated.</p>
      </Alert>
    }

    return (
      <div className="account-basic">
        <div className="row">
          <div className="col-md-5 user-avatar">
            <ImageUploader handleFileChange={this.handleFileChange} />
            <img
              src={userAvatar}
              alt={`Hình đại diện của ${fullName}`}
              title={`Hình đại diện của ${fullName}`} />
            <span className="camera-icon">
              <i className="fa fa-camera fa-2x"></i>
            </span>
          </div>
          <div className="col-md-7 user-info">
            <div className="header">
              <h3>{fullName}</h3>
              <p>{email}</p>
            </div>
            <div className="body">
              {alert}
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="col-sm-4 control-label">
                    <FormattedMessage {...messages.phone.label} />
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      value={phone || ''}
                      onChange={this.phoneChanged}
                      placeholder={formatMessage(messages.phone.placeholder)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">
                    <FormattedMessage {...messages.roomNo.label} />
                  </label>
                  <div className="col-sm-8">
                    <Select
                      name="form-field-name"
                      value={room || ''}
                      options={roomList}
                      onChange={this.roomSelected}
                      placeholder={formatMessage(messages.roomNo.placeholder)}
                    />
                  </div>
                </div>
                <div className="col-sm-offset-4 col-sm-8">
                  <button
                    type="submit"
                    className="btn btn-default"
                    onClick={this.props.saveUserInfo}>
                    <FormattedMessage {...messages.save} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {this.state.modalCropImageShown &&
          <ModalCropImage
            onRequestHide={this.handleRequestHide}
            modalCropImageShown={this.state.modalCropImageShown}
            image={this.state.img}
            width={250}
            height={250}
            onCrop={this.props.uploadAvatar}
          />
        }
      </div>
    );
  }
}

AccountBasic.propTypes = {
  intl: intlShape.isRequired,
  currentUser: PropTypes.object.isRequired,
  userInfoChanged: PropTypes.func.isRequired,
  saveUserInfo: PropTypes.func.isRequired
};

AccountBasic.defaultProps = {
  currentUser: {
    fullName: '',
    email: '',
    avatar: '',
    gender: '',
    phone: '',
    room: ''
  }
};

export default injectIntl(AccountBasic);
