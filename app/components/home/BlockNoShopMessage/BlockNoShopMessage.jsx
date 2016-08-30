import React, { Component } from 'react';
import './BlockNoShopMessage.scss';
import { FormattedMessage } from 'react-intl';
import { messages } from './BlockNoShopMessage.i18n';

export default class BlockNoShopMessage extends Component {
  render() {
    return (
      <div className="block-no-shop-message text-center">
        <h2>
          <FormattedMessage {...messages.noShop} />
        </h2>
      </div>
    )
  }
}

