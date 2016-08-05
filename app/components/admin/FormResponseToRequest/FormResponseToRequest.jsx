import React from 'react';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import { messages } from 'app/components/admin/FormResponseToRequest/FormResponseToRequest.i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import requestStatus from 'app/shared/requestStatus';
import LabelRequestStatus from 'app/components/admin/LabelRequestStatus';
import AlertSubmitResult from 'app/components/admin/AlertSubmitResult';
import AsyncResultCode from 'app/shared/asyncResultCodes';

import './FormResponseToRequest.scss';

class FormResponseToRequest extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      isValid: false,
      responseToBeSent: {
        responseType: 'accept',
        responseMessage: {
          value: '',
          error: '',
          hasErrors: false
        }
      },
      request: props.request
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderResponseForm = this.renderResponseForm.bind(this);

    this.changeResponse = (e) => {
      const { responseToBeSent } = this.state;
      let isValid = true;
      responseToBeSent['responseType'] = e.target.value;
      if(e.target.value === 'reject') {
        isValid = false;
      }
      this.setState({
        isValid,
        responseToBeSent
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { submitResult } = nextProps;
    const { request, responseToBeSent: { responseMessage } } = this.state;
    if(submitResult.message_code === AsyncResultCode.REJECT_REQUEST_SUCCESS) {
      request.status = requestStatus.REJECTED;
      request.adminMessage = responseMessage.value;
      this.setState({
        request
      });
    }
    if(submitResult.message_code === AsyncResultCode.ACCEPT_REQUEST_SUCCESS) {
      request.status = requestStatus.ACCEPTED;
      this.setState({
        request
      });
    }
  }

  handleOnChange(e) {
    const { responseToBeSent } = this.state;
    const { responseMessage } = responseToBeSent;
    let isValid = true;
    responseMessage['value'] = e.target.value;
    responseMessage['error'] = '';
    responseMessage['hasErrors'] = false;
    if(e.target.value.trim().length == 0) {
      responseMessage['error'] = 'Cannot be blank';
      responseMessage['hasErrors'] = true;
      isValid = false;
    }

    responseToBeSent.responseMessage = responseMessage;

    this.setState({
      responseToBeSent,
      isValid
    });
  }

  handleSubmit() {
    const { responseType, responseMessage } = this.state.responseToBeSent;
    let { request } = this.state;
    if(responseType === 'accept' ) {
      this.props.acceptRequest(request.id, responseMessage.value);
    } else if (responseType === 'reject') {
      this.props.rejectRequest(request.id, responseMessage.value);
    }
  }
  renderResponseForm() {
    const { isSubmitting, submitResult, intl: { formatMessage } } = this.props;
    const { request, responseToBeSent: { responseType, responseMessage }, isValid } = this.state;
    if(request.status === requestStatus.PENDING) {
      return (
        <Col lg={9}>
          <FormGroup>
            <ControlLabel>
              <FormattedMessage {...messages.formResponseToRequest.responseForm.fields.response}/>
            </ControlLabel>
            <div class="radio">
              <label>
                <input
                  type="radio"
                  name="response"
                  onChange={this.changeResponse}
                  value="accept"/>
                  {' '}<FormattedMessage {...messages.formResponseToRequest.responseForm.response.accept}/>
              </label>
            </div>
            <div class="radio">
              <label>
                <input
                  type="radio"
                  name="response"
                  onChange={this.changeResponse}
                  value="reject"/>
                  {' '}<FormattedMessage {...messages.formResponseToRequest.responseForm.response.reject}/>
              </label>
            </div>
          </FormGroup>
          {
            responseType == 'reject' && (
              <FormGroup className={`${responseMessage.hasErrors ? 'has-error' : ''}`}>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.responseForm.fields.reason}/>
                </ControlLabel>
                <FormControl
                  name="responseMessage"
                  componentClass="textarea"
                  value={responseMessage.value}
                  placeholder={formatMessage(messages.formResponseToRequest.responseForm.fields.reason)}
                  onChange={this.handleOnChange}
                  />
                <div className="help-block">{responseMessage.error}</div>
              </FormGroup>
            )
          }

          <div className="form-actions">
            {submitResult !== '' &&
              <AlertSubmitResult result={submitResult} />
            }
            <Button
              bsStyle="warning"
              onClick={this.handleSubmit}
              disabled={isSubmitting || !isValid }>
              {formatMessage(messages.formResponseToRequest.responseForm.button.submitResponse)}{ isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
              </Button>
          </div>
        </Col>
      );
    } else {
      return (
        <Col lg={9}>
          <div className="form-group">
            <label className="control-label">
              <FormattedMessage {...messages.formResponseToRequest.responseForm.fields.requestStatus}/>
            </label>
            <p className="form-control-static">
              <LabelRequestStatus status={request.status}/>
            </p>
          </div>
          {
            request.adminMessage &&
            <div className="form-group">
              <label className="control-label">
                <FormattedMessage {...messages.formResponseToRequest.responseForm.fields.adminMessage}/>
              </label>
              <textarea className="form-control" disabled="true" defaultValue={request.adminMessage}/>
            </div>
          }
        </Col>
      );
    }
  }
  render() {
    const { request } = this.state;
    const seller = request.seller || {};
    if(!request) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return(
        <div>
          <div className="row">
            <Col lg={3}>
              <h4>
                <strong>
                  <FormattedMessage {...messages.formResponseToRequest.requestDetail.sectionName}/>
                </strong>
              </h4>
              <p>
                <FormattedMessage {...messages.formResponseToRequest.requestDetail.sectionDescription}/>
              </p>
            </Col>
            <Col lg={9}>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requestDetail.fields.name}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.name}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requestDetail.fields.description}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.description}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.phone}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.address}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.phone}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.phone}
                </FormControl.Static>
              </FormGroup>
            </Col>
          </div>
          <hr />
          <div className="row">
            <Col lg={3}>
              <h4>
                <strong>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.sectionName}/>
                </strong>
              </h4>
              <p>
                <FormattedMessage {...messages.formResponseToRequest.requesterInformation.sectionDescription} />
              </p>
            </Col>
            <Col lg={9}>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.fullName}/>
                </ControlLabel>
                <FormControl.Static>
                  {seller.fullName}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.phone}/>
                </ControlLabel>
                <FormControl.Static>
                  {seller.phone}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.email}/>
                </ControlLabel>
                <FormControl.Static>
                  {seller.email}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.identityNumber}/>
                </ControlLabel>
                <FormControl.Static>
                  {seller.identityNumber}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.identityPhoto}/>
                </ControlLabel>
                <FormControl.Static>
                  <img
                    className="identity-photo"
                    src={seller.identityPhoto}
                    alt={`Identity photo of ${seller.fullName}`}
                    />
                </FormControl.Static>
              </FormGroup>
            </Col>
          </div>
          <hr />
          <div className="row">
            <Col lg={3}>
              <h4 className="role-title">
                <strong>
                  <FormattedMessage {...messages.formResponseToRequest.responseForm.sectionName}/>
                </strong>
              </h4>
              <p>
                <FormattedMessage {...messages.formResponseToRequest.responseForm.sectionDescription}/>
              </p>
            </Col>
            {this.renderResponseForm()}
          </div>
        </div>
      );
    }
  }
}

FormResponseToRequest.defaultProps = {
  request: {
    seller: {}
  }
}

export default injectIntl(FormResponseToRequest);
