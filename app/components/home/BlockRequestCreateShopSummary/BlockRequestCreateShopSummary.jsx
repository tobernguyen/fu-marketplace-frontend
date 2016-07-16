import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { fields } from 'app/shared/fields';
import { messages } from './BlockRequestCreateShopSummary.i18n';
import './BlockRequestCreateShopSummary.scss';

export default class BlockRequestCreateShopSummary extends Component {
  render() {
    const {
      sellerInfo: { identityNumber, phone  },
      shopInfo: { address, description, name, note }
    } = this.props.requestSummary;
    return (
      <div className="block-request-create-shop-summary">
        <h4>
          <FormattedMessage {...messages.requestShopSuccessfullyTitle} />
        </h4>
        <div className="callout seller">
          <h3 className="title">
            <FormattedMessage {...messages.shopOwnerInfo} />
          </h3>
          <div className="body">
            <ul className="nav">
              <li>
                <FormattedMessage {...fields.phone} />: <code>{phone}</code>
              </li>
              <li>
                <FormattedMessage {...fields.identityNumber} />: <code>{identityNumber}</code>
              </li>
            </ul>
          </div>
        </div>
        <div className="callout shop">
          <h3 className="title">
            <FormattedMessage {...messages.shopInfo} />
          </h3>
          <div className="body">
            <ul className="nav">
              <li>
                <FormattedMessage {...fields.shopName} />: <code>{name}</code>
              </li>
              <li>
                <FormattedMessage {...fields.shopDescription} />: <code>{description}</code>
              </li>
              <li>
                <FormattedMessage {...fields.shopAddress} />: <code>{address}</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

BlockRequestCreateShopSummary.propTypes = {
  requestSummary: PropTypes.object.isRequired
};
