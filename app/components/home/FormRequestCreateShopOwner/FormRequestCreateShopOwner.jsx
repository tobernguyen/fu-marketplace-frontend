import React, { PropTypes, Component } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { messages } from './FormRequestCreateShopOwner.i18n';
import { buttons } from 'app/shared/buttons';

class FormRequestCreateShopOwner extends Component {
  render() {
    const {
      fields: { phone, identityNumber },
      handleSubmit
    } = this.props;

    const { formatMessage } = this.props.intl;

    return (
      <form onSubmit={handleSubmit}>
        <h4 className="page-header">Thông tin chủ shop</h4>
        <div className={`form-group ${phone.touched && phone.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.phone.label} />
          </label>
          <input type="text"
                 className="form-control"
                 placeholder={formatMessage(messages.phone.placeholder)}
            {...phone} />
          <div className="help-block">
            {phone.touched ? phone.error : ''}
          </div>
        </div>

        <div className={`form-group ${identityNumber.touched && identityNumber.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.identityNumber.label} />
          </label>
          <input type="text"
                 className="form-control"
                 placeholder={formatMessage(messages.identityNumber.placeholder)}
            {...identityNumber} />
          <div className="help-block">
            {identityNumber.touched ? identityNumber.error : ''}
          </div>
        </div>
        <div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              <FormattedMessage {...buttons.next} /> <i className="fa fa-chevron-right"/>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

FormRequestCreateShopOwner.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default injectIntl(FormRequestCreateShopOwner);
