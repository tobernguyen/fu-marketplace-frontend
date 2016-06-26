import React, { Component, PropTypes } from 'react';
import './BlockShopHeader.scss';
import  ModalCropImage from '../ModalCropImage';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { messages } from './BlockShopHeader.i18n';
import { FormattedMessage } from 'react-intl';

export default class BlockShopHeader extends Component {
  constructor(props) {
    super(props);

    const { shop: { avatar, cover }, sellerMode } = props;

    this.state = {
      modalCropImageShown: false,
      image: null,
      shopAvatar: avatar,
      shopCover: cover,
      error: null,
      sellerMode: sellerMode
    };

    this.handleRequestHide = () => {
      this.setState({
        modalCropImageShown: false
      })
    };

    this.onAvatarChange = (files) => {
      const reader = new FileReader();
      var file = files[0];
      if (!file) {
        return;
      }
      reader.onload = (image) => {
        this.refs.dropzoneAvatar.value = '';

        this.setState({
          modalCropImageShown: true,
          image: image.target.result
        })
      };

      reader.readAsDataURL(file);
    };

    this.onCoverChange = (files) => {
      this.setState({
        error: null
      });
      const reader = new FileReader();
      var file = files[0];
      if (!file) {
        return;
      }
      reader.onload = (imageData) => {
        this.refs.dropzoneCover.value = '';

        const image = new Image();
        image.onload = () => {
          if (image.width < 850 || image.height < 250) {
            this.setState({
              error: messages.updateCoverWarning
            })
          } else {
            this.props.uploadShopCover(imageData.target.result);
          }
        };
        image.src = imageData.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shop && this.state.sellerMode) {
      let shopAvatar = nextProps.shop.avatar || '';
      if (shopAvatar !== this.state.shopAvatar) {
        this.setState({
          userAvatar: shopAvatar,
          modalCropImageShown: false
        });
      }

      let shopCover = nextProps.shop.cover || '';
      if (shopCover !== this.state.shopCover) {
        this.setState({
          shopCover: shopCover
        });
      }
    }
  }

  render() {
    const { shop: { address, avatar, cover, description, name, opening }, sellerMode } = this.props;
    return (
      <div className="block-shop-header clearfix">
        <div className="shop-cover">
          <img src={cover} />
          <div className="shop-info-wrapper col-md-12">
            <div className="shop-avatar-wrapper row">
              <div className="col-sm-3 shop-avatar">
                <img src={avatar}/>
                {sellerMode && <div className="upload-avatar">
                  <Dropzone ref="dropzoneAvatar"
                            onDrop={this.onAvatarChange}
                            className="file-select"
                            multiple={false}
                            accept="image/*">
                    <i className="fa fa-camera"/> <FormattedMessage {...messages.updateAvatar} />
                  </Dropzone>
                </div>}
              </div>
            </div>
          </div>
          <div className="col-md-12 shop-nav-wrapper">
            <div className="row">
              <div className="col-md-3 col-md-offset-3">
                <div className="row shop-basic-info">
                  <h4 className="title">{name}</h4>
                  <span className={classNames('status', { 'opening' : opening})}><i className="fa fa fa-circle"/> { opening ? 'Đang mở cửa': 'Đang đóng cửa' }</span>
                </div>
              </div>
              <div className="col-md-3">
                <ul className="nav shop-info">
                  <li><i className="fa fa-map-marker" /> {address}</li>
                  <li><i className="fa fa-mobile" /> 01262338766</li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="nav shop-info">
                  <li><i className="fa fa-envelope-o" /> hieutdse02289</li>
                  <li><i className="fa fa-facebook-official" /> hyhy</li>
                </ul>
              </div>
            </div>
          </div>
          {this.state.error && <div className="status-message">
            <span>
              <FormattedMessage {...this.state.error} />
            </span>
          </div>
          }
          {sellerMode && <div className="update-cover">
            <Dropzone ref="dropzoneCover"
                      onDrop={this.onCoverChange}
                      className="file-upload"
                      multiple={false}
                      accept="image/*">
              <i className="fa fa-magic"/> <FormattedMessage {...messages.updateCover} />
            </Dropzone>
          </div>
          }

        </div>
        {this.state.modalCropImageShown &&
        <ModalCropImage
          onRequestHide={this.handleRequestHide}
          modalCropImageShown={this.state.modalCropImageShown}
          image={this.state.image}
          width={250}
          height={250}
          onCrop={this.props.uploadShopAvatar} />
        }
      </div>
    )
  }
}


BlockShopHeader.propTypes = {
  shop: PropTypes.object.isRequired,
  sellerMode: PropTypes.bool.isRequired
};
