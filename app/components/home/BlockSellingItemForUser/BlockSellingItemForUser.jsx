import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './BlockSellingItemForUser.scss';
import classNames from 'classnames';
import { messages } from './BlockSellingItemForUser.i18n';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';

class BlockSellingItemForUser extends Component {
  constructor(props) {
    super(props);

    const { buyNow, item, addToCard } = this.props;

    this.handleAddToCard = () => {
      addToCard(item);
    };

    this.handleBuyNow = () => {
      buyNow(item);
    };
  }

  renderAddCartButton(itemID) {
    const { cartItems } = this.props;

    const itemIndex = _.findIndex(cartItems, (cartItem) =>
      cartItem.id === itemID
    );

    const isAddedToCart = (itemIndex !== -1);
    const { formatMessage } = this.props.intl;

    return (
      <div className="add-to-cart">
          <span
            onClick={this.handleAddToCard}
            title={ isAddedToCart ? formatMessage(messages.removeFromCart) : formatMessage(messages.addToCart) }
            className={classNames({ 'added': isAddedToCart })}>
            <i className="fa fa-shopping-bag" />
          </span>
      </div>
    );
  }

  render() {
    const { item, shopOpening } = this.props;
    const tooltip = (
      item.description ? <Tooltip id="tooltip">{item.description}</Tooltip> : <span/>
    );
    return (
      <div className="block-selling-item for-user col-md-3 col-xs-4">
        <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="row item">
            <a className="item-image">
              <img src={item.image} />
              {shopOpening && <div className="actions">
                <p>
                  <strong className="buyNow" onClick={this.handleBuyNow}>
                    <FormattedMessage {...messages.buyNow} />
                  </strong>
                </p>
              </div>}
            </a>
            <div className="info clearfix">
              <table>
                <tbody>
                <tr>
                  <td>
                    <div>
                        <span className="name">
                          {item.name}
                        </span>
                      <span className="price"><FormattedNumber value={item.price}/> ₫</span>
                    </div>
                  </td>
                  {shopOpening && <td>
                    {this.renderAddCartButton(item.id)}
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

BlockSellingItemForUser.propTypes = {
  item:       PropTypes.object.isRequired,
  addToCard:  PropTypes.func.isRequired,
  buyNow:     PropTypes.func.isRequired,
  cartItems:  PropTypes.array.isRequired
};

export default injectIntl(BlockSellingItemForUser);
