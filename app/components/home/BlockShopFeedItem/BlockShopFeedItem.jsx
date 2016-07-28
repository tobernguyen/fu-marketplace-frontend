import React, { Component, PropTypes } from 'react';
import './BlockShopFeedItem.scss';
import { Link } from 'react-router';
import classNames from 'classnames';
import BlockStars from '../BlockStars';

export default class BlockShopFeedItem extends Component {
  constructor(props) {
    super(props);

    const { avatar, itemImages } = this.props.shop;

    this.state = {
      avatar: avatar,
      itemImages: itemImages,
      thumbnail: avatar
    };

    this.handleMouseMove = (e) => {
      const { width, left } = e.target.getBoundingClientRect();
      const cursorPosX = e.clientX - left;

      const imagePartWidth = width / itemImages.length;
      const itemImageIndex = Math.floor(cursorPosX / imagePartWidth);
      this.setState({
        thumbnail: itemImages[itemImageIndex]
      })
    };

    this.handleMouseLeave = () => {
      this.setState({
        thumbnail: this.state.avatar
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shop && nextProps.shop.avatar) {
      this.setState({
        avatar: nextProps.shop.avatar,
        thumbnail: nextProps.shop.avatar
      })
    }
  }

  render() {
    const { query, shop: { id, name, description, categories, shipPlaces, opening, averageRating } } = this.props;
    let avatar = this.state.thumbnail;
    if (!avatar || avatar === '') {
      const noAvatar = require('../../../images/no_avatar.jpg');
      avatar = noAvatar;
    }

    return (
      <div className="block row block-shop-feed-item">
        <div className="col-md-3 col-sm-4">
          <div className="row thumbnail">
            <Link to={{ pathname: `shops/${id}`, query: query }}>
              <img
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                src={avatar}
                className="img-responsive"/>
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-sm-8">
          <div className="row content">
            {!opening && <div className="shop-closed">
              <img src={require('app/images/shop-closed.png')}/>
            </div>}
            <h3>
              <Link to={{ pathname: `shops/${id}`, query: query }}>
                {name}
              </Link>
            </h3>
            <BlockStars
              name={'averageRating'}
              value={averageRating}
              editing={false}
            />
            <div className="category">
              <ul className="nav">
                {categories.map((category, key) =>
                  <li key={key}>
                    <Link to={{ pathname: '/', query: { category: category.id } }}>
                      {category.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="description quote">
              {description}
            </div>
            <div className="ship-dorms">
              <ul className="nav">
                {shipPlaces.map((shipPlace, key) =>
                  <li key={key}>
                    <Link to={{ pathname: '/', query: { ship_to: shipPlace.id } }}>
                      {shipPlace.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlockShopFeedItem.propTypes = {
  shop: PropTypes.object.isRequired
};
