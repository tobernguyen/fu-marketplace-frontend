import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import './FormRejectOrder.scss';
class FormRejectOrder extends Component {
  focusNext() {
    let input = ReactDOM.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { fields : { reason }, dirty, handleSubmit, submitting} = this.props;
    return (
      <div className="dropdown-menu form-reject-order">
        <form onSubmit={handleSubmit}>
          <div className={`form-group has-feedback ${reason.touched && reason.invalid ? 'has-error' : ''}`}>
            <label className="control-label">
              <FormattedMessage {...messages.modalViewOrder.rejectForm.label} />
            </label>
            <input
              type="text"
              placeholder={formatMessage(messages.modalViewOrder.rejectForm.placeholder)}
              className="form-control"
              {...reason}
              />
            <div className="help-block">
              {reason.touched ? reason.error : ''}
            </div>
          </div>
          <button type="submit" className="btn btn-sm btn-danger">
            <FormattedMessage {...messages.modalViewOrder.rejectForm.button}/>
          </button>
        </form>
      </div>
    );
  }
}

export default injectIntl(FormRejectOrder);
