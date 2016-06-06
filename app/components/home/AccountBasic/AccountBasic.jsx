import React, { Component, PropTypes } from 'react';
import { messages } from './AccountBasic.i18n';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import  ModalCropImage from '../ModalCropImage';
import ImageUploader from 'app/components/common/ImageUploader';
import './AccountBasic.scss';
import './react-select.scss';
import Select from 'react-select';

const AVATAR_SMALL_SIZE_EXT = '-small.jpg';
const AVATAR_MEDIUM_SIZE_EXT = '-medium.jpg';

class AccountBasic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalCropImageShown: false,
      img: null,
      roomNo: ""
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

    this.roomSelected = (dorm) => {
      this.setState({
        roomNo: dorm ? dorm.value : ''
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        modalCropImageShown: false
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
      <div className="account-basic">
        <div className="row">
          <div className="col-md-5 user-avatar">
            <ImageUploader handleFileChange={this.handleFileChange} />
            <img
              src={userAvatar}
              alt={`Hình đại diện của ${currentUser.fullName}`}
              title={`Hình đại diện của ${currentUser.fullName}`} />
            <span className="camera-icon">
              <i className="fa fa-camera fa-2x"></i>
            </span>
          </div>
          <div className="col-md-7 user-info">
            <div className="header">
              <h3>{currentUser.fullName}</h3>
              <p>{currentUser.email}</p>
            </div>
            <div className="body">
              <form className="form-horizontal">
                <div className="form-group">
                  <label for="accountPhoneNumber" className="col-sm-4 control-label">
                    <FormattedMessage {...messages.phone.label} />
                  </label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accountPhoneNumber" placeholder={formatMessage(messages.phone.placeholder)} />
                  </div>
                </div>
                <div className="form-group">
                  <label for="accountRoomNumber" className="col-sm-4 control-label">
                    <FormattedMessage {...messages.roomNo.label} />
                  </label>
                  <div className="col-sm-8">
                    <Select
                      name="form-field-name"
                      value={this.state.roomNo}
                      options={roomList}
                      onChange={this.roomSelected}
                      placeholder={formatMessage(messages.roomNo.placeholder)}
                    />
                  </div>
                </div>
                <div className="col-sm-offset-4 col-sm-8">
                  <button type="submit" className="btn btn-default">
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
  currentUser: PropTypes.object.isRequired
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
