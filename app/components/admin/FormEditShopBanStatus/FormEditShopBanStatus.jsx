import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditShopBanStatus/FormEditShopBanStatus.i18n';
import AlertSubmitResult from 'app/components/admin/AlertSubmitResult';

class FormEditShopBanStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isValid: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      name: e.target.value
    });
    if (e.target.value === this.props.shop.name) {
      this.setState({
        isValid: true
      });
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  handleOnClick() {
    const { shop } = this.props;
    if(this.state.name === shop.name) {
      if(shop.banned === false) {
        this.props.adminBanShop();
      } else if ( shop.banned === true) {
        this.props.adminUnbanShop();
      }
    }
  }

  render() {
    const { shop, isSubmitting, submitResult, intl: { formatMessage } } = this.props;
    return(
      <div className="row">
        <Col lg={3}>
          <h4 className="ban-title">
            <strong>
              <FormattedMessage {...messages.formEditShopBanStatus.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditShopBanStatus.sectionDescription}/>
          </p>
        </Col>
        <Col lg={9}>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.formEditShopBanStatus.fields.shopName}/>
            </ControlLabel>
            <FormControl
              type="text"
              name="name"
              placeholder={formatMessage(messages.formEditShopBanStatus.fields.shopName)}
              onChange={this.handleOnChange}
              />
          </FormGroup>
          <ul>
            <li>
              <FormattedMessage {...messages.formEditShopBanStatus.message.line1}/>
            </li>
            <li>
              <FormattedMessage {...messages.formEditShopBanStatus.message.line2}/>
            </li>
            <li>
              <FormattedHTMLMessage {...messages.formEditShopBanStatus.message.line3} values={{ name: shop.name }} />
            </li>
          </ul>
          <div className="form-actions">
              {
                submitResult !== '' &&
                <AlertSubmitResult result={submitResult} />
              }

              <Button
                bsStyle="danger"
                onClick={this.handleOnClick}
                disabled={isSubmitting || !this.state.isValid}>
                {shop.banned ? formatMessage(messages.formEditShopBanStatus.button.release) : formatMessage(messages.formEditShopBanStatus.button.ban)}{isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
              </Button>
            </div>
        </Col>
      </div>
    );
  }
}

FormEditShopBanStatus.defaultProps = {
  shop: {}
};

export default injectIntl(FormEditShopBanStatus);
