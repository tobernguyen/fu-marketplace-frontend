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
      img: null
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

    this.roomSelected = (room) => {
      const roomNo = room ? room.value : '';
    }
  }

  render() {
    const { currentUser } = this.props;
    const { formatMessage } = this.props.intl;
    const { avatar, fullName, email, room, phone } = currentUser;

    return (
      <div className="account-basic">
        <div className="row">
          <div className="col-md-5 user-avatar">
            <ImageUploader handleFileChange={this.handleFileChange} />
            <img
              src={avatar}
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
