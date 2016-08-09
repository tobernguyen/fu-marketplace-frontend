import React, { Component } from 'react';
import { messages } from 'app/components/admin/FormShopPromotionCampaign/FormShopPromotionCampaign.i18n';
import { FormattedMessage , injectIntl } from 'react-intl';
import DateTime from 'react-datetime';
import moment from 'moment';
import AlertSubmitResult from 'app/components/admin/AlertSubmitResult';
import shopPromotionCampaignType from 'app/shared/promotionCampaignType';

class FormEditShopPromotionCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      selectedPromotion: {
        id: '',
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
        },
        active: ''
      }
    };

    this.handleStartDateChange = (newStartDate) => {
      const {  selectedPromotion: {startDate, endDate} } = this.state;
      let isValid = false;
      startDate['value'] = newStartDate;
      if(startDate.value.isBefore(endDate.value)) {
        startDate['hasErrors'] = false;
        startDate['error'] = null;
        endDate['hasErrors'] = false;
        endDate['error'] = null;
        isValid = true;
      } else {
        startDate['hasErrors'] = true;
        startDate['error'] = {
          id: 'admin.form.validation.startDateMustBeforeEndDate',
          defaultMessage: 'Start date must before end date.'
        };
      }
      const { selectedPromotion } = this.state;
      selectedPromotion['startDate'] = startDate;
      selectedPromotion['endDate'] = endDate;
      this.setState({
        selectedPromotion,
        isValid
      });
    }

    this.handleEndDateChange = (newEndDate) => {
      const {  selectedPromotion: {startDate, endDate} } = this.state;
      let isValid = false;
      endDate['value'] = newEndDate;
      if(endDate.value.isAfter(startDate.value)) {
        endDate['hasErrors'] = false;
        endDate['error'] = null;
        startDate['hasErrors'] = false;
        startDate['error'] = null;
        isValid = true;
      } else {
        endDate['hasErrors'] = true;
        endDate['error'] = {
          id: 'admin.form.validation.endDateMustAfterStartDate',
          defaultMessage: 'End date must after start date.'
        };
      }

      const { selectedPromotion } = this.state;
      selectedPromotion['startDate'] = startDate;
      selectedPromotion['endDate'] = endDate;
      this.setState({
        selectedPromotion,
        isValid
      });
    }

    this.handleTypeChange = (e) => {
      const { selectedPromotion: {type} } = this.state;
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
      const { selectedPromotion } = this.state;
      selectedPromotion['type'] = type;
      this.setState({
        selectedPromotion,
        isValid
      });
    }

    this.handleActiveChange = () => {
      const { selectedPromotion } = this.state;
      selectedPromotion.active = !selectedPromotion.active;
      this.setState({
        selectedPromotion,
        isValid: true
      });
    };

    this.handleSubmit = () => {
      const { selectedPromotion, selectedPromotion: { startDate, endDate }, isValid } = this.state;
      if(endDate.value.isAfter(startDate.value) && !endDate.value.isSame(startDate.value) && isValid) {
        this.props.adminUpdateShopPromotionCampaign(selectedPromotion);
      } else {
        endDate['hasErrors'] = true;
        endDate['error'] = {
          id: 'admin.form.validation.endDateMustAfterStartDate',
          defaultMessage: 'End date must after start date.'
        };
        selectedPromotion.endDate = endDate;
        this.setState({
          selectedPromotion
        });
      }
    }
  }

  componentWillMount() {
    const promotion = this.props.promotionList.filter((promotion) => {
      return promotion.id == this.props.promotionId
    });
    const selectedPromotion = promotion[0];
    if(selectedPromotion) {
      this.setState({
        selectedPromotion: {
          id: selectedPromotion.id,
          startDate: {
            value: moment(selectedPromotion.startDate),
            hasErrors: false,
            error: null
          },
          endDate: {
            value: moment(selectedPromotion.endDate),
            hasErrors: false,
            error: null
          },
          type: {
            value: selectedPromotion.type,
            hasErrors: false,
            error: null
          },
          active: selectedPromotion.active
        }
      });
    }
  }

  render() {
    const { selectedPromotion: {startDate, endDate, type, active }, isValid } = this.state;
    const { intl: { formatMessage }, submitResult, isSubmitting } = this.props;
    return (
      <div className="row">
        <div className="col-lg-3">
          <h4 className="role-title">
            <FormattedMessage {...messages.formEditShopPromotionCampaign.sectionName}/>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditShopPromotionCampaign.sectionDescription}/>
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
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formShopPromotionCampaign.fields.active}/>
            </label>
            <div className="checkbox checkbox-slider--b control">
              <label>
                <input type="checkbox"
                       checked={active}
                       onChange={this.handleActiveChange} /><span/>
              </label>
            </div>
          </div>
          <div className="form-actions">
            {
              submitResult !== '' &&
              <AlertSubmitResult result={submitResult}/>
            }
            <button type="button" className="btn btn-success" onClick={this.handleSubmit} disabled={!isValid || isSubmitting}>
              <FormattedMessage {...messages.formEditShopPromotionCampaign.button.saveChanges} />{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
          </div>
      </div>
    );
  }
}

export default injectIntl(FormEditShopPromotionCampaign);
