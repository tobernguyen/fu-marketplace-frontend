import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './BlockSellingItem.scss';

export default class BlockSellingItem extends Component {
  render() {
    const { item } = this.props;
    const tooltip = (
      item.description ? <Tooltip id="tooltip">{item.description}</Tooltip> : <span/>
    );
    return (
      <div className="block-selling-item col-md-3 col-xs-4">
        <OverlayTrigger placement="top" overlay={tooltip}>
        <div className="row item">
          <a href="#" className="item-image">
            <img className="img-responsive" src={item.image} />
          </a>
          <div className="info">
            <a href="#" className="name">{item.name}</a>
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
