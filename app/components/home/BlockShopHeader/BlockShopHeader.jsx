import React, { Component, PropTypes } from 'react';
import './BlockShopHeader.scss';
import  ModalCropImage from '../ModalCropImage';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

export default class BlockShopHeader extends Component {
  constructor(props) {
    super(props);

    const { sellerShop: { avatar } } = props;

    this.state = {
      modalCropImageShown: false,
      image: null,
      shopAvatar: avatar
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
        this.refs.dropzone.value = '';

        this.setState({
          modalCropImageShown: true,
          image: image.target.result
        })
      };

      reader.readAsDataURL(file);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellerShop) {
      let shopAvatar = nextProps.sellerShop.avatar || '';
      if (shopAvatar !== this.state.shopAvatar) {
        this.setState({
          userAvatar: shopAvatar,
          modalCropImageShown: false
        });
      }
    }
  }

  render() {
    const { sellerShop: { address, avatar, cover, description, name, opening } } = this.props;
    return (
      <div className="block-shop-header clearfix">
        <div className="shop-cover">
          <img src="//media.foody.vn/biz_banner/foody-bannerhome_1000x375_khaisilk-new-635949338423039610.png"/>
          <div className="shop-info-wrapper col-md-12">
            <div className="shop-avatar-wrapper row">
              <div className="col-sm-3 shop-avatar">
                <img src={avatar}/>
                <div className="upload-avatar">
                  <Dropzone ref="dropzone"
                            onDrop={this.onAvatarChange}
                            className="file-select"
                            multiple={false}
                            accept="image/*">
                    <i className="fa fa-camera"/> Update avatar
                  </Dropzone>
                </div>
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
          <div className="update-cover">
            <Dropzone ref="dropzone"
                      onDrop={this.props.onCoverChange}
                      className="file-upload"
                      multiple={false}
                      accept="image/*">
              <i className="fa fa-magic"/> Update cover
            </Dropzone>
          </div>
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
  sellerShop: PropTypes.object.isRequired
};
