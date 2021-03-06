import React, { Component, PropTypes } from 'react';
import ImageUploader from 'app/components/common/ImageUploader';
import  ModalCropImage from '../ModalCropImage';
import { messages } from './FormAccountBasic.i18n';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import './FormAccountBasic.scss';
import Select from 'react-select';
import { UPDATE_STATUS } from 'app/shared/statusCode';

class FormAccountBasic extends Component {
  constructor(props) {
    super(props);

    const { currentUser } = props;
    let userAvatar = currentUser.avatar || '';
    userAvatar = userAvatar.replace('avatar-small.jpg', 'avatar-medium.jpg');

    this.state = {
      modalCropImageShown: false,
      img: null,
      userAvatar: userAvatar,
      error: null
    };

    this.handleFileChange = (dataURI) => {
      this.setState({
        modalCropImageShown: true,
        img: dataURI,
        error: null
      })
    };

    this.handleRequestHide = () => {
      this.setState({
        modalCropImageShown: false
      })
    };

    this.roomSelected = (room) => {
      const roomNo = room ? room.value : '';
      this.props.fields.room.onChange(roomNo);
    };

    this.handleFileError = (error) => {
      this.setState({
        error: messages[error]
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      let userAvatar = nextProps.currentUser.avatar || '';
      if (userAvatar !== this.state.userAvatar) {
        userAvatar = userAvatar.replace('avatar-small.jpg', 'avatar-medium.jpg');
        this.setState({
          userAvatar: userAvatar,
          modalCropImageShown: false
        });
      }
    }
  }

  renderUpdateStatus() {
    switch (this.props.userUpdateStatus) {
      case UPDATE_STATUS.UPDATED:
        return (
          <p className="update-status success">
            <FormattedMessage {...messages.updateStatus.success} />
          </p>
        );
      case UPDATE_STATUS.FAILED:
        return (
          <p className="update-status failed">
            <FormattedMessage {...messages.updateStatus.failed} />
          </p>
        )
    }
  }

  render() {
    const { fields: { room, phone }, handleSubmit, currentUser, dirty, avatarUploading, userUpdateStatus } = this.props;
    const updating = (userUpdateStatus === UPDATE_STATUS.UPDATING);

    const fullName = currentUser.fullName || '';
    const email = currentUser.email || '';
    const { formatMessage } = this.props.intl;
    return (
      <div className="form-account-basic">
        <div className="row">
          <div className="col-sm-5 col-xs-4 user-avatar">
            <ImageUploader handleFileChange={this.handleFileChange} handleFileError={this.handleFileError} />
            <img
              src={this.state.userAvatar} />
            <span className="camera-icon">
              <i className="fa fa-camera fa-2x" />
            </span>
            {avatarUploading && <span className="uploading-avatar">
              <i className="fa fa-spinner fa-spin fa-2x fa-fw"/>
            </span>}
            {this.state.error && <div className="error">
              <FormattedMessage {...this.state.error} />
            </div>}
          </div>
          <div className="col-sm-7 col-xs-8 user-info">
            <div className="header">
              <h3>{fullName}</h3>
              <p>{email}</p>
            </div>
            <div className="body">
              <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className={`form-group ${phone.touched && phone.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-4 control-label">
                    <FormattedMessage {...messages.phone.label} />
                  </label>
                  <div className="col-sm-8">
                    <input type="text"
                           className="form-control"
                           placeholder={formatMessage(messages.phone.placeholder)}
                    {...phone} />
                    <div className="help-block">
                      {phone.touched && phone.error ? formatMessage(phone.error) : ''}
                    </div>
                  </div>
                </div>

                <div className={`form-group ${room.touched && room.invalid ? 'has-error' : ''}`}>
                  <label className="col-sm-4 control-label">
                    <FormattedMessage {...messages.roomNo.label} />
                  </label>
                  <div className="col-sm-8">
                    <Select
                      name="form-field-room"
                      value={room.value || ''}
                      options={this.props.roomList}
                      onChange={this.roomSelected}
                      placeholder={formatMessage(messages.roomNo.placeholder)} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-8">
                    <button type="submit" className="btn btn-primary" disabled={updating || !dirty}>
                      <FormattedMessage {...messages.save} /> {updating && <i className="fa fa-spinner fa-spin" />}
                    </button>
                    {this.renderUpdateStatus()}
                  </div>
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
          onCrop={this.props.uploadAvatar} />}
      </div>
    )
  }
}

FormAccountBasic.propTypes = {
  intl:         intlShape.isRequired,
  fields:       PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting:   PropTypes.bool.isRequired,
  currentUser:  PropTypes.object.isRequired,
  roomList:     PropTypes.array.isRequired
};


export default injectIntl(FormAccountBasic)
