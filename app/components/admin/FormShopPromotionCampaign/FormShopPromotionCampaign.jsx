import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormShopPromotionCampaign/FormShopPromotionCampaign.i18n';
import { Alert } from 'react-bootstrap';
import DateTime from 'react-datetime';
import moment from 'moment';
import shopPromotionCampaignType from 'app/shared/promotionCampaignType';
import AsyncResultCode from 'app/shared/asyncResultCodes';


class FormShopPromotionCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      startDate: {
        value: moment(),
        hasErrors: false,
        error: null
      },
      endDate: {
        value: moment(),
        hasErrors: false,
        error: null
      },
      type: {
        value: '',
        hasErrors: false,
        error: null
      }
    }

    this.handleStartDateChange = (newStartDate) => {
      const { startDate, endDate } = this.state;
      startDate['value'] = newStartDate;
      if(startDate.value.isBefore(endDate.value)) {
        startDate['hasErrors'] = false;
        startDate['error'] = null;
        endDate['hasErrors'] = false;
        endDate['error'] = null;
      } else {
        startDate['hasErrors'] = true;
        startDate['error'] = {
          id: 'admin.form.validation.startDateMustBeforeEndDate',
          defaultMessage: 'Start date must before end date.'
        };
      }

      this.setState({
        startDate,
        endDate
      });
    }

    this.handleEndDateChange = (newEndDate) => {
      const { startDate, endDate } = this.state;
      endDate['value'] = newEndDate;
      if(endDate.value.isAfter(startDate.value)) {
        endDate['hasErrors'] = false;
        endDate['error'] = null;
        startDate['hasErrors'] = false;
        startDate['error'] = null;
      } else {
        endDate['hasErrors'] = true;
        endDate['error'] = {
          id: 'admin.form.validation.endDateMustAfterStartDate',
          defaultMessage: 'End date must after start date.'
        };
      }

      this.setState({
        endDate,
        startDate
      });
    }

    this.handleTypeChange = (e) => {
      const { type } = this.state;
      let isValid = false;
      type['value'] = e.target.value;
      if(e.target.value === 'nan') {
        type['hasErrors'] = true;
        type['error'] = {
          id: 'admin.form.validation.aTypeMustBeChosen',
          defaultMessage: 'Must choose a type.'
        }
      } else {
        type['hasErrors'] = false;
        type['error'] = null;
        isValid = true;
      }

      this.setState({
        type,
        isValid
      });
    }

    this.handleSubmit = () => {
      const { startDate, endDate, type, isValid } = this.state;
      if(endDate.value.isAfter(startDate.value) && !endDate.value.isSame(startDate.value) && isValid) {
        this.props.createShopPromotionCampaign(startDate.value, endDate.value, type.value);
      } else {
        endDate['hasErrors'] = true;
        endDate['error'] = {
          id: 'admin.form.validation.endDateMustAfterStartDate',
          defaultMessage: 'End date must after start date.'
        };
        this.setState({
          endDate
        });
      }
    }
  }
  render() {
    const { intl: { formatMessage }, submitResult } = this.props;
    const { endDate, startDate, type, isValid } = this.state;
    return (
      <div className="row">
        <div className="col-lg-3">
          <h4 className="role-title">
            <strong>
              <FormattedMessage {...messages.formShopPromotionCampaign.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formShopPromotionCampaign.sectionDescription} />
          </p>
        </div>
        <div className="col-lg-9">
          <div className={`form-group ${startDate.hasErrors ? 'has-error' : ''}`}>
            <label className="control-label">
              <FormattedMessage {...messages.formShopPromotionCampaign.fields.startDate}/>
            </label>
            <br />
            <DateTime
              value={startDate.value}
              onChange={this.handleStartDateChange}
              locale="vi"
            />
            <span className="help-block">
              {startDate.hasErrors && formatMessage(startDate.error)}
            </span>
          </div>
          <div className={`form-group ${endDate.hasErrors ? 'has-error' : ''}`}>
            <label className="control-label">
              <FormattedMessage {...messages.formShopPromotionCampaign.fields.endDate}/>
            </label>
            <br />
            <DateTime
              value={endDate.value}
              onChange={this.handleEndDateChange}
              locale="vi"
            />
            <span className="help-block">
              {endDate.hasErrors && formatMessage(endDate.error)}
            </span>
          </div>
          <div className={`form-group ${type.hasErrors ? 'has-error' : ''}`}>
            <label className="control-label">
              <FormattedMessage {...messages.formShopPromotionCampaign.fields.type}/>
            </label>
            <select className="form-control" onChange={this.handleTypeChange} value={type.value}>
              <option value="nan"></option>
              <option value={shopPromotionCampaignType.TOP_FEED_SLIDE_SHOW}>Top shop feed</option>
            </select>
            <span className="help-block">
              {type.hasErrors && formatMessage(type.error)}
            </span>
          </div>
          <div className="form-actions">
            {
              submitResult === AsyncResultCode.CREATE_PROMOTION_SUCCESS &&
              <Alert bsStyle="success">
                <FormattedMessage {...messages.formShopPromotionCampaign.submitResult.success}/>
              </Alert>
            }
            {
              submitResult === AsyncResultCode.CREATE_PROMOTION_FAILURE &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formShopPromotionCampaign.submitResult.fail}/>
              </Alert>
            }
            <button type="button" className="btn btn-success" onClick={this.handleSubmit} disabled={!isValid}>
              <FormattedMessage {...messages.formShopPromotionCampaign.button.createShopPromotionCampaign} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(FormShopPromotionCampaign);
