import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormShopPromotionCampaign/FormShopPromotionCampaign.i18n';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import shopPromotionCampaignType from 'app/shared/promotionCampaignType';

import 'react-datepicker/dist/react-datepicker.css';

class FormShopPromotionCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      startDate: {
        value: moment(),
        hasErrors: false
      },
      endDate: {
        value: moment(),
        hasErrors: false
      },
      type: ''
    }

    this.handleStartDateChange = (newStartDate) => {
      const { startDate } = this.state;
      startDate['value'] = newStartDate;
      this.setState({
        startDate
      });
    }

    this.handleEndDateChange = (newEndDate) => {
      const { endDate } = this.state;
      endDate['value'] = newEndDate;
      this.setState({
        endDate
      });
    }

    this.handleTypeChange = (e) => {
      this.setState({
        type: e.target.value
      });
    }

    this.handleSubmit = () => {
      const { startDate, endDate, type } = this.state;
      this.props.createShopPromotionCampaign(startDate.value, endDate.value, type);
    }
  }
  render() {
    const { intl: { formatMessage } } = this.props;
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
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formShopPromotionCampaign.fields.startDate}/>
            </label>
            <br />
            <DatePicker
              className="form-control"
              selected={this.state.startDate.value}
              startDate={this.state.startDate.value}
              endDate={this.state.endDate.value}
              onChange={this.handleStartDateChange}
              dateFormat="DD/MM/YYYY"
              todayButton={formatMessage(messages.formShopPromotionCampaign.button.today)}
              />
          </div>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formShopPromotionCampaign.fields.endDate}/>
            </label>
            <br />
            <DatePicker
              className="form-control"
              selected={this.state.endDate.value}
              startDate={this.state.startDate.value}
              endDate={this.state.endDate.value}
              onChange={this.handleEndDateChange}
              dateFormat="DD/MM/YYYY"
              todayButton={formatMessage(messages.formShopPromotionCampaign.button.today)}
              />
          </div>
          <div className="form-group">
            <label className="control-label">

              <FormattedMessage {...messages.formShopPromotionCampaign.fields.type}/>
            </label>
            <select className="form-control" onChange={this.handleTypeChange}>
              <option value="nan"></option>
              <option value={shopPromotionCampaignType.TOP_FEED_SLIDE_SHOW}>Top shop feed</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-success" onClick={this.handleSubmit}>
              <FormattedMessage {...messages.formShopPromotionCampaign.button.createShopPromotionCampaign} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(FormShopPromotionCampaign);
