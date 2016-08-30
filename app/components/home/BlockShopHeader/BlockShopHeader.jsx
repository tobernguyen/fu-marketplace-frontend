import React, { Component, PropTypes } from 'react';
import './BlockShopHeader.scss';
import  ModalCropImage from '../ModalCropImage';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { messages } from './BlockShopHeader.i18n';
import { FormattedMessage } from 'react-intl';
import BlockStars from '../BlockStars';
import { Link } from 'react-router';
import { FILE_SIZE } from 'app/shared/threshold';

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
      this.setState({
        error: null
      });

      const reader = new FileReader();
      var file = files[0];
      if (!file) {
        return;
      }

      if (file.size > FILE_SIZE.MAX_AVATAR_COVER_SIZE) {
        this.setState({
          error: messages.tooBigAvatar
        });

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

      if (file.size > FILE_SIZE.MAX_AVATAR_COVER_SIZE) {
        this.setState({
          error: messages.tooBigCover
        });

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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shop && this.state.sellerMode) {
      let shopAvatar = nextProps.shop.avatar || '';

      if (shopAvatar !== this.state.shopAvatar && !nextProps.formSubmitting) {
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

  renderOpeningStatus() {
    const { shop: { opening } } = this.props;
    return (
      <span className={classNames('status', { 'opening' : opening})}>
        <i className="fa fa fa-circle"/>
      </span>
    )
  }

  renderStars() {
    const { shop } = this.props;
    if (shop.averageRating) {
      return (
        <BlockStars
          name={'averageRating'}
          value={shop.averageRating || 0}
          editing={false}
        />
      )
    }

  }

  render() {
    const { shop: { id, address, avatar, cover, description, name }, sellerMode, shopOwner } = this.props;
    let shopAvatar = avatar;
    let shopCover = cover;
    if (!avatar || avatar === '') {
      const noAvatar = require('../../../images/no_avatar.jpg');
      shopAvatar = noAvatar;
    }

    if (!shopCover || shopCover === '') {
      const noCover = require('../../../images/no_cover.jpg');
      shopCover = noCover;
    }

    let isLongName = false;
    if (shopOwner.fullName) {
      isLongName = shopOwner.fullName.length > 15;
    }
    return (
      <div className="block-shop-header clearfix">
        <div className="shop-cover">
          <img src={shopCover} />
          <div className="shop-info-wrapper col-md-12">
            <div className="shop-avatar-wrapper row">
              <div className="col-sm-3 col-xs-3 shop-avatar">
                <img src={shopAvatar}/>
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
              <div className={classNames('col-sm-offset-3', { 'col-sm-6': !isLongName }, { 'col-sm-5': isLongName })}>
                <div className="row shop-basic-info">
                  <h4 className="title">{name} {this.renderOpeningStatus()}</h4>
                  <Link to={{ pathname: `shops/${id}/reviews`, query: this.props.query }} className="rating">
                    {this.renderStars()} <FormattedMessage {...messages.seeReviews} />
                  </Link>
                </div>
              </div>
              <div className={classNames({'col-sm-3': !isLongName}, {'col-sm-4': isLongName})}>
                <ul className="nav shop-info">
                  <li><i className="fa fa-user" /> {shopOwner.fullName}</li>
                  <li><i className="fa fa-map-marker" /> {address}</li>
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
        <div className="col-md-12 description-wrapper">
          <div className="quote">
            {description}
          </div>
        </div>
        {this.state.modalCropImageShown &&
        <ModalCropImage
          formSubmitting={this.props.formSubmitting}
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
  sellerMode: PropTypes.bool.isRequired,
  shopOwner: PropTypes.object.isRequired
};
