import React, { PropTypes, Component } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { messages } from './FormRequestCreateShopInfo.i18n';
import { buttons } from 'app/shared/buttons';

class FormRequestCreateShopInfo extends Component {
  render() {
    const {
      fields: { shopName, description, address, shopPhone },
      handleSubmit,
      previousPage,
      submitting,
      hasShop
    } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <form onSubmit={handleSubmit}>
        <h4 className="page-header">Thông tin shop</h4>
        <div className={`form-group ${shopName.touched && shopName.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.shopName.label} />
          </label>
          <input type="text"
                 className="form-control"
                 placeholder={formatMessage(messages.shopName.placeholder)}
            {...shopName} />
          <div className="help-block">
            {shopName.touched && shopName.error ? <FormattedMessage {...shopName.error} /> : ''}
          </div>
        </div>

        <div className={`form-group ${shopPhone.touched && shopPhone.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.shopPhone.label} />
          </label>
          <input type="text"
                 className="form-control"
                 placeholder={formatMessage(messages.shopPhone.placeholder)}
                 {...shopPhone} />
          <div className="help-block">
            {shopPhone.touched && shopPhone.error ? <FormattedMessage {...shopPhone.error} /> : ''}
          </div>
        </div>

        <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.description.label} />
          </label>
          <textarea
            className="form-control" {...description}
            placeholder={formatMessage(messages.description.placeholder)}
          />
          <div className="help-block">
            {description.touched && description.error ? <FormattedMessage {...description.error} /> : ''}
          </div>
        </div>

        <div className={`form-group ${address.touched && address.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.address.label} />
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={formatMessage(messages.address.placeholder)}
            {...address} />
          <div className="help-block">
            {address.touched && address.error ? <FormattedMessage {...address.error} /> : ''}
          </div>
        </div>

        <div className="form-group clearfix">
          {!hasShop && <button type="button" disabled={submitting} onClick={previousPage} className="btn btn-primary pull-left">
            <i className="fa fa-chevron-left"/> <FormattedMessage {...buttons.previous} />
          </button>}
          <button type="submit" disabled={submitting} className="btn btn-success pull-right">
            {submitting ? <i className="fa fa-spinner" /> : <i className="fa fa-paper-plane"/>} <FormattedMessage {...buttons.register} />
          </button>
        </div>
      </form>
    );
  }
}

FormRequestCreateShopInfo.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};


export default injectIntl(FormRequestCreateShopInfo);
