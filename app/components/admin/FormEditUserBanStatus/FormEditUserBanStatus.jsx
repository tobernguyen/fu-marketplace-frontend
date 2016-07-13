import React, { Component } from 'react';
import {
  ControlLabel,
  Button,
  FormGroup,
  FormControl,
  Alert,
  Col
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditUserBanStatus/FormEditUserBanStatus.i18n';

class FormEditUserBanStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isValid: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      email: e.target.value
    });
    if(e.target.value === this.props.user.email) {
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
    const { user } = this.props;
    if(this.state.email === user.email) {
      if(user.banned === false || user.banned === null || !user.banned) {
        this.props.adminBanUser(user);
      } else if ( user.banned === true) {
        this.props.adminUnbanUser(user);
      }
    }
  }

  render() {
    const { user, isSubmitting, submitResult, intl: { formatMessage } } = this.props;
    return(
      <div className="row">
        <Col lg={3}>
          <h4 className="ban-title">
            <strong>
              <FormattedMessage {...messages.formEditUserBanStatus.sectionName} />
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditUserBanStatus.sectionDescription} />
          </p>
        </Col>
        <Col lg={9}>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.formEditUserBanStatus.fields.email}/>
            </ControlLabel>
            <FormControl
              type="text"
              name="email"
              placeholder={formatMessage(messages.formEditUserBanStatus.fields.email)}
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <ul>
            <li>
              <FormattedMessage {...messages.formEditUserBanStatus.message.line1}/>
            </li>
            <li>
              <FormattedMessage {...messages.formEditUserBanStatus.message.line2}/>
            </li>
            <li>
              <FormattedHTMLMessage {...messages.formEditUserBanStatus.message.line3} values={{ email: user.email }}/>
            </li>
          </ul>
          <div className="form-actions">
            {
              submitResult === AsyncResultCode.BAN_USER_SUCCESS &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formEditUserBanStatus.submitResult.banSuccess}/>
              </Alert>
            }
            {
              submitResult === AsyncResultCode.BAN_USER_FAIL &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formEditUserBanStatus.submitResult.fail}/>
              </Alert>
            }
            {
              submitResult === AsyncResultCode.UNBAN_USER_SUCCESS &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formEditUserBanStatus.submitResult.releaseSuccess}/>
              </Alert>
            }
            {
              submitResult === AsyncResultCode.UNBAN_USER_FAIL &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formEditUserBanStatus.submitResult.fail}/>
              </Alert>
            }

            <Button
              bsStyle="danger"
              onClick={this.handleOnClick}
              disabled={isSubmitting || !this.state.isValid}>
              {user.banned ? formatMessage(messages.formEditUserBanStatus.button.release) : formatMessage(messages.formEditUserBanStatus.button.ban)}
            </Button>
          </div>
        </Col>
      </div>
    );
  }
}

FormEditUserBanStatus.defaultProps={
  user: {
    email: ''
  }
};

export default injectIntl(FormEditUserBanStatus);
