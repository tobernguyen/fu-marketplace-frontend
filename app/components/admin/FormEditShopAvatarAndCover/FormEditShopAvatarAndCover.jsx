import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  Alert,
  Button
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditShopAvatarAndCover/FormEditShopAvatarAndCover.i18n';


import './FormEditShopAvatarAndCover.scss';

class FormEditShopAvatarAndCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      avatar: '',
      avatarPreviewUrl: this.props.shop.avatar || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=150&h=150',
      cover: '',
      coverPreviewUrl: this.props.shop.cover || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=500&h=200'
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.uploadAvatarAndCover = this.uploadAvatarAndCover.bind(this);
  }

  handleUploadImage(e) {
    e.preventDefault();

    const reader = new FileReader();
    var file = e.target.files[0];

    if(!file) {
      return;
    }
    if(e.target.id === 'avatar') {
      reader.onloadend = () => {
        this.setState({
          avatar: file,
          avatarPreviewUrl: reader.result
        });
      }
    } else if(e.target.id ==='cover') {
      reader.onloadend = () => {
        this.setState({
          cover: file,
          coverPreviewUrl: reader.result
        });

      }
    }

    reader.readAsDataURL(file);

    this.setState({
      isValid: true
    });
  }

  uploadAvatarAndCover(e) {
    e.preventDefault();
    if(this.state.avatar !== '') {
      let avatarFileData = new FormData();
      avatarFileData.append('file', this.state.avatar);
      this.props.uploadAvatar(avatarFileData);
    }
    if(this.state.cover != '') {
      let coverFileData = new FormData();
      coverFileData.append('file', this.state.cover);
      this.props.uploadCover(coverFileData);
    }

    this.setState({
      isValid: false
    });
  }

  render() {
    const { shop, submitResult } = this.props;
    const { isValid } = this.state;
    return (
      <div className="row">
        <Col lg={3}>
          <h4>
            <strong>
              <FormattedMessage {...messages.formEditShopAvatarAndCover.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditShopAvatarAndCover.sectionDescription}/>
          </p>
        </Col>
        <Col lg={9}>
          <h5>
            <strong>
              <FormattedMessage {...messages.formEditShopAvatarAndCover.fields.avatar}/>
            </strong>
          </h5>
          <FormGroup>
            <img
            src={this.state.avatarPreviewUrl}
            alt={`Avatar of ${shop.name}`}
            title={`Avatar of ${shop.name}`}
            height={150}
            width={150}
            />
            <input id="avatar" type="file" ref="in" accept="image/*" onChange={this.handleUploadImage} />
          </FormGroup>
          <h5>
            <strong>
              <FormattedMessage {...messages.formEditShopAvatarAndCover.fields.cover}/>
            </strong>
          </h5>
          <FormGroup>
            <img
              src={this.state.coverPreviewUrl}
              alt={`Cover of ${shop.name}`}
              title={`Cover of ${shop.name}`}
              height={200}
              width={500}
              />
            <input id="cover" type="file" ref="in" accept="image/*" onChange={this.handleUploadImage} />
          </FormGroup>
          <div className ="form-actions">
            {
              submitResult === AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS &&
              <Alert bsStyle="success">
                <FormattedMessage {...messages.formEditShopAvatarAndCover.submitResult.success}/>
              </Alert>
            }
            {
              submitResult === AsyncResultCode.UPDATE_SHOP_AVATAR_FAIL &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formEditShopAvatarAndCover.submitResult.fail}/>
              </Alert>
            }
            <Button type="submit" bsStyle="success" onClick={this.uploadAvatarAndCover} disabled={!isValid}>
              <FormattedMessage {...messages.formEditShopAvatarAndCover.button.saveChanges}/>
            </Button>
          </div>
        </Col>
      </div>
    );
  }
}

FormEditShopAvatarAndCover.defaultProps = {
  shop: {}
};

export default injectIntl(FormEditShopAvatarAndCover);
