import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router';
import './BlockSellingItem.scss';

export default class BlockSellingItem extends Component {
  render() {
    const { item, shopID } = this.props;
    const tooltip = (
      item.description ? <Tooltip id="tooltip">{item.description}</Tooltip> : <span/>
    );
    const updateURL = `/shops/${shopID}/dashboard/items/${item.id}/update`;
    return (
      <div className="block-selling-item col-md-3 col-xs-4">
        <OverlayTrigger placement="top" overlay={tooltip}>
        <div className="row item">
          <Link to={updateURL} className="item-image">
            <img className="img-responsive" src={item.image} />
          </Link>
          <div className="info">
            <Link to={updateURL} className="name">
              {item.name}
            </Link>
            <span className="price">{item.price} ₫</span>
          </div>
        </div>
        </OverlayTrigger>
      </div>
    )
  }
}


BlockSellingItem.propTypes = {
  item: PropTypes.object.isRequired
};
