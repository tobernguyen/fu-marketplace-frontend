import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router';
import './BlockSellingItem.scss';
import { FormattedNumber } from 'react-intl';

export default class BlockSellingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, shopID } = this.props;
    const tooltip = (
      item.description ? <Tooltip id="tooltip">{item.description}</Tooltip> : <span/>
    );
    const updateURL = `/dashboard/shops/${shopID}/items/${item.id}/update`;
    return (
      <div className="block-selling-item col-md-3 col-xs-4">
        <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="row item">
            <Link to={updateURL} className="item-image">
              <img src={item.image} />
            </Link>
            <div className="info">
              <div>
                <Link to={updateURL} className="name">
                  {item.name}
                </Link>
                <span className="price"><FormattedNumber value={item.price}/> ₫</span>
              </div>
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
