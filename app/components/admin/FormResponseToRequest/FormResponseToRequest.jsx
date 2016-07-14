import React from 'react';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { messages } from 'app/components/admin/FormResponseToRequest/FormResponseToRequest.i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import requestStatus from 'app/shared/requestStatus';
import LabelRequestStatus from 'app/components/admin/LabelRequestStatus';

class FormResponseToRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      responseToBeSent: {
        responseType: 'accept',
        responseMessage: ''
      },
      request: {}
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderResponseForm = this.renderResponseForm.bind(this);

    this.changeResponse = (e) => {
      this.setState({
        isValid: true,
        responseToBeSent: {
          responseType: e.target.value
        }
      });
    }
  }

  componentWillMount() {
    const request = this.props.requestList.filter((request) => {
      return request.id == this.props.requestId
    });
    this.setState({
      request: request[0]
    });
  }

  handleOnChange(e) {
    const responseToBeSent = this.state.responseToBeSent;
    responseToBeSent[e.target.name] = e.target.value;
    this.setState({
      responseToBeSent
    });
  }

  handleSubmit() {
    const { responseType, responseMessage } = this.state.responseToBeSent;
    let { request } = this.state;
    if(responseType === 'accept' ) {
      this.props.acceptRequest(request.id, responseMessage);
      request.status = 2;
      this.setState({
        request
      });
    } else if (responseType === 'reject') {
      this.props.rejectRequest(request.id, responseMessage);
      request.status = 1;
      this.setState({
        request
      });
    }
  }
  renderResponseForm() {
    const { isSubmitting, submitResult, intl: { formatMessage } } = this.props;
    const { request, responseToBeSent: { responseType }, isValid } = this.state;
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
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.responseForm.fields.reason}/>
                </ControlLabel>
                <FormControl
                  name="responseMessage"
                  componentClass="textarea"
                  placeholder={formatMessage(messages.formResponseToRequest.responseForm.fields.reason)}
                  onChange={this.handleOnChange}
                  />
              </FormGroup>
            )
          }

          <div className="form-actions">
            {submitResult === 'OK' && <Alert bsStyle="success">Response submitted</Alert>}
            {submitResult === AsyncResultCode.NOT_A_PENDING_REQUEST && <Alert bsStyle="danger">Error! Request is not a pending request</Alert>}
            <Button
              bsStyle="warning"
              onClick={this.handleSubmit}
              disabled={isSubmitting || !isValid }>
              {formatMessage(messages.formResponseToRequest.responseForm.button.submitResponse)}
              </Button>
          </div>
        </Col>
      );
    } else {
      return (
        <Col lg={9}>
          <LabelRequestStatus status={request.status}/>
        </Col>
      );
    }
  }
  render() {
    const { isSubmitting } = this.props;
    const { request } = this.state;
    if(!request || isSubmitting ) {
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
                  <FormattedMessage {...messages.formResponseToRequest.requestDetail.fields.address}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.address}
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
                  {request.seller.fullName}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.phone}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.seller.phone}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.email}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.seller.email}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.identityNumber}/>
                </ControlLabel>
                <FormControl.Static>
                  {request.seller.identityNumber}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage {...messages.formResponseToRequest.requesterInformation.fields.identityPhoto}/>
                </ControlLabel>
                <FormControl.Static>
                  <img
                    src={request.seller.identityPhoto}
                    alt={`Identity photo of ${request.seller.fullName}`}
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
