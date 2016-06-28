import React, { Component, PropTypes } from 'react';
import './BlockShoppingCart.scss';
import { FormattedMessage, FormattedPlural, FormattedNumber, injectIntl, intlShape } from 'react-intl';
import { messages } from './BlockShoppingCart.i18n';

class BlockShoppingCart extends Component {

  calculateTotal() {
    const { cartItems } = this.props;
    const total = cartItems.map((item) =>
      item.price
    ).reduce((a, b) => a + b, 0);

    return <FormattedNumber value={total} />;
  }

  renderCartDescription () {
    const totalItem = this.props.cartItems.length;
    const { formatMessage } = this.props.intl;
    if (totalItem === 0) {
      return <FormattedMessage {...messages.emptyCart} />
    } else {
      return <span>
        {totalItem}{' '}
        <FormattedPlural value={totalItem}
                         one={formatMessage(messages.itemSingular)}
                         other={formatMessage(messages.itemPlural)} />
      </span>
    }
  }

  render() {
    return (
      <div className="block-shopping-cart">
        <a href="#">
          <h4>
            <span className="total">
              {this.calculateTotal()}₫
            </span>
            <i className="fa fa-shopping-cart"/>
          </h4>
          <p>{this.renderCartDescription()}</p>
        </a>
      </div>
    )
  }
}

BlockShoppingCart.propTypes = {
  intl:       intlShape.isRequired,
  cartItems:  PropTypes.array.isRequired
};

export default injectIntl(BlockShoppingCart)
