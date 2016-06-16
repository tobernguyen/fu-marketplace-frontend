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
        <h4 className="page-header">
          <FormattedMessage {...messages.requestShopSuccessfullyTitle} />:
        </h4>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">
              <FormattedMessage {...messages.shopOwnerInfo} />:
            </h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>
                <FormattedMessage {...fields.phone} />: {phone}
              </li>
              <li>
                <FormattedMessage {...fields.identityNumber} />: {identityNumber}
              </li>
            </ul>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">
              <FormattedMessage {...messages.shopInfo} />:
            </h3>
          </div>
          <div className="panel-body">
            <ul>
              <li>
                <FormattedMessage {...fields.shopName} />: {name}
              </li>
              <li>
                <FormattedMessage {...fields.shopDescription} />: {description}
              </li>
              <li>
                <FormattedMessage {...fields.shopAddress} />: {address}
              </li>
              <li>
                <FormattedMessage {...fields.note} />: {note}
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
