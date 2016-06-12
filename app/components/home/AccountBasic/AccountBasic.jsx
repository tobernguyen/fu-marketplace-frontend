import React, { Component, PropTypes } from 'react';
import { messages } from './AccountBasic.i18n';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import  ModalCropImage from '../ModalCropImage';
import ImageUploader from 'app/components/common/ImageUploader';
import './AccountBasic.scss';
import './react-select.scss';
import Select from 'react-select';
import { Alert } from 'react-bootstrap';
import { getImageURLWithMediumSize } from 'app/helpers/image';



class AccountBasic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalCropImageShown: false,
      img: null,
      alertVisible: false,
      userAvatar: '',
      avatarLoaded: false
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
      const phone = evt.target.value || '';
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
      if (!this.state.avatarLoaded) {
        let userAvatar = getImageURLWithMediumSize(nextProps.currentUser.avatar);
        this.setState({
          avatarLoaded: true,
          userAvatar: userAvatar
        })
      }
    }
    if (nextProps.userUpdated) {
      this.setState({
        alertVisible: nextProps.userUpdated
      })
    }
    if (nextProps.newAvatar) {
      let userAvatar = getImageURLWithMediumSize(nextProps.newAvatar);
      this.setState({
        userAvatar: userAvatar,
        modalCropImageShown: false
      })
    }
  }

  render() {
    const { currentUser } = this.props;
    const { formatMessage } = this.props.intl;
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
              src={this.state.userAvatar}
              alt={`Hình đại diện của ${fullName}`}
              title={`Hình đại diện của ${fullName}`} />
            <span className="camera-icon">
              <i className="fa fa-camera fa-2x" />
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
                      name="form-field-room"
                      value={room || ''}
                      options={this.props.roomList}
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
  saveUserInfo: PropTypes.func.isRequired,
  roomList: PropTypes.array.isRequired
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
