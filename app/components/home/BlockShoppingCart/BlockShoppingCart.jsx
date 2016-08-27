import React, { Component, PropTypes } from 'react';
import './BlockShoppingCart.scss';
import { FormattedMessage, FormattedPlural, FormattedNumber, injectIntl, intlShape } from 'react-intl';
import { messages } from './BlockShoppingCart.i18n';
import classNames from 'classnames';

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
      <div className={classNames('block-shopping-cart', {'animated rubberBand': this.props.cartItems.length > 0})}>
        <a onClick={this.props.checkOut} className={classNames({'has-pointer': this.props.cartItems.length > 0})}>
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
  intl:       intlShape,
  cartItems:  PropTypes.array.isRequired,
  checkOut:   PropTypes.func.isRequired
};

export default injectIntl(BlockShoppingCart)
