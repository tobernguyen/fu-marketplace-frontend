import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router';
import './BlockSellingItem.scss';
import { FormattedNumber } from 'react-intl';
import OptionItem from 'app/components/common/OptionItem';
import classNames from 'classnames';
import ImageLoader from 'app/components/common/ImageLoader';

const ITEM_STATUS = {
  FOR_SELL: 1,
  NOT_FOR_SELL: 0
};
export default class BlockSellingItem extends Component {
  constructor(props) {
    super(props);
  }

  renderCheckBox() {
    const { item, toggleItemStatus } = this.props;
    const optionItem = {
      id: item.id,
      checked: item.status === ITEM_STATUS.FOR_SELL
    };
    return (
      <OptionItem item={optionItem} toggleItem={toggleItemStatus} noLabel={true}/>
    )
  }

  render() {
    const { item, shopID, sellerMode } = this.props;
    const tooltip = (
      item.description ? <Tooltip id="tooltip">{item.description}</Tooltip> : <span/>
    );
    const notForSell = (item.status === ITEM_STATUS.NOT_FOR_SELL);
    const updateURL = `/dashboard/shops/${shopID}/items/${item.id}/update`;
    return (
      <div className={classNames('block-selling-item col-md-3 col-xs-4', { 'not-for-sell': notForSell })}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="row item">
            <Link to={updateURL} className="item-image">
              <ImageLoader imageSource={item.image}/>
            </Link>
            <div className="info clearfix">
              <table>
                <tbody>
                <tr>
                  <td>
                    <div>
                      <Link to={updateURL} className="name">
                        {item.name}
                      </Link>
                      <span className="price"><FormattedNumber value={item.price}/> ₫</span>
                    </div>
                  </td>
                  {sellerMode && <td>
                    {this.renderCheckBox()}
                  </td>}
                </tr>
                </tbody>
              </table>
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
