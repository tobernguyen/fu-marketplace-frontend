import React, { Component, PropTypes } from 'react';
import './BlockShopFeedItem.scss';
import { Link } from 'react-router';

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
        thumbnail: avatar
      })
    }
  }

  render() {
    const { shop: { id, name, description, categories, shipPlaces } } = this.props;

    return (
      <div className="block row block-shop-feed-item">
        <div className="col-md-3 col-sm-4">
          <div className="row thumbnail">
            <Link to={`shops/${id}`}>
              <img
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
                src={this.state.thumbnail}
                className="img-responsive"/>
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-sm-8">
          <div className="row content">
            <h3>
              <Link to={`shops/${id}`}>
                {name}
              </Link>
            </h3>
            <div className="category">
              <ul className="nav">
                {categories.map((category, key) =>
                  <li key={key}>
                    <a href="#">{category.name}</a>
                  </li>
                )}
              </ul>
            </div>
            <div className="description">
              {description}
            </div>
            <div className="ship-dorms">
              <ul className="nav">
                {shipPlaces.map((shipPlace, key) =>
                  <li key={key}>
                    <a href="#">{shipPlace.name}</a>
                  </li>
                )}

              </ul>
              <i>Last updated: 23:51 05/06/2016</i>
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
