import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormChangeTicketStatus/FormChangeTicketStatus.i18n';
import TicketStatus from 'app/shared/ticketStatus';
import LabelTicketStatus from 'app/components/admin/LabelTicketStatus'
import AsyncResultCode from 'app/shared/asyncResultCodes';

class ResponseSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
      adminMessage: {
        value: '',
        hasErrors: false,
        error: ''
      }
    }

    this.handleAdminMessageChange = (e) => {
      const { adminMessage } = this.state;
      adminMessage['value'] = e.target.value;
      if(e.target.value.trim().length === 0) {
        adminMessage['hasErrors'] = true;
        adminMessage['error'] = messages.formChangeTicketStatus.responseSection.error.blank;
      } else {
        adminMessage['hasErrors'] = false,
        adminMessage['error'] = ''
      }

      this.setState({
        dirty: true,
        adminMessage
      });
    }

    this.handleStartInvestigate = () => {
      const { ticket: { selectedTicket }} = this.props;
      this.props.adminInvestigateTicket(selectedTicket.id);
    }

    this.handleCloseTicket = () => {
      const { ticket: { selectedTicket }} = this.props;
      const { adminMessage } = this.state;
      if(adminMessage.value.trim().length === 0) {
        adminMessage['hasErrors'] = true;
        adminMessage['error'] = messages.formChangeTicketStatus.responseSection.error.blank;
        this.setState({
          adminMessage,
          dirty: false
        });
      } else {
        this.props.adminCloseTicket(selectedTicket.id, adminMessage.value);
      }

    }

    this.renderResponse = this.renderResponse.bind(this);
  }

  renderResponse(status) {
    const { intl: { formatMessage }, isSubmitting } = this.props;
    const { adminMessage, dirty } = this.state;
    let output = '';

    switch (status) {
      case TicketStatus.OPENING:
        output = (
          <div className="form-actions">
            <button type="button" className="btn btn-warning" onClick={this.handleStartInvestigate} disabled={isSubmitting}>
              <FormattedMessage {...messages.formChangeTicketStatus.responseSection.button.startInvestigate}/>{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
        );
        break;
      case TicketStatus.INVESTIGATING:
        output = (
          <div>
            <div className={`form-group ${adminMessage.hasErrors ? 'has-error': ''}`}>
              <label className="control-label">
                <FormattedMessage {...messages.formChangeTicketStatus.responseSection.fields.adminMessage}/>
              </label>
              <textarea
                className="form-control"
                placeholder={formatMessage(messages.formChangeTicketStatus.responseSection.placeholder.adminMessage)}
                value={adminMessage.value}
                onChange={this.handleAdminMessageChange}
                />
              {
                adminMessage.hasErrors &&
                <div className="help-block">
                  <FormattedMessage {...adminMessage.error}/>
                </div>
              }
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-warning" onClick={this.handleCloseTicket} disabled={!dirty || adminMessage.hasErrors || isSubmitting}>
                <FormattedMessage {...messages.formChangeTicketStatus.responseSection.button.closeTicket}/>{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
              </button>
            </div>
          </div>
        );
      default:

    }

    return output;
  }

  render() {
    const { ticket: { selectedTicket }} = this.props;
    return (
      <div className="row">
        <div className="col-lg-3">
          <h4 className="role-title">
            <strong>
              <FormattedMessage {...messages.formChangeTicketStatus.responseSection.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formChangeTicketStatus.responseSection.sectionDescription}/>
          </p>
        </div>
        <div className="col-lg-9">
          <div className="form-group">
            <label className="label-control">
              <FormattedMessage {...messages.formChangeTicketStatus.responseSection.fields.currentStatus}/>
            </label>
            <p className="form-control-static">
              <LabelTicketStatus status={selectedTicket.status} />
            </p>
          </div>
          {this.renderResponse(selectedTicket.status)}
        </div>
      </div>
    );
  }
}

export default injectIntl(ResponseSection);
