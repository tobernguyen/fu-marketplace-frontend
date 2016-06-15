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

class FormResponseToRequest extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      responseToBeSent: {
        responseType: 'accept',
        responseMessage: ''
      },
      request: {}
    }
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { id } = this.state.request;
    if(responseType === 'accept' ) {
      this.props.acceptRequest(id, responseMessage);
    } else if (responseType === 'reject') {
      this.props.rejectRequest(id, responseMessage);
    }
  }
  render() {
    const { isSubmitting, submitResult } = this.props;
    const { request } = this.state;
    if(!request) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return(
        <div>
          <div className="row">
            <Col lg={3}>
              <h4><strong>Request detail</strong></h4>
            </Col>
            <Col lg={9}>
              <FormGroup>
                <ControlLabel>Shop name</ControlLabel>
                <FormControl.Static>
                  {request.name}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl.Static>
                  {request.description}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl.Static>
                  {request.address}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Status</ControlLabel>
                <FormControl.Static>
                  {request.status}
                </FormControl.Static>
              </FormGroup>
            </Col>
          </div>
          <hr />
          <div className="row">
            <Col lg={3}>
              <h4><strong>Requester Information</strong></h4>
            </Col>
            <Col lg={9}>
              <FormGroup>
                <ControlLabel>Full name</ControlLabel>
                <FormControl.Static>
                  {request.seller.fullName}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Phone</ControlLabel>
                <FormControl.Static>
                  {request.seller.phone}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl.Static>
                  {request.seller.email}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Identity number</ControlLabel>
                <FormControl.Static>
                  {request.seller.identityNumber}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Identity photo</ControlLabel>
                <FormControl.Static>
                  <img
                    src={request.seller.identityPhoto}
                    alt={`Identity photo of ${request.seller.fullName}`}
                    height={150}
                    width={300}
                    />
                </FormControl.Static>
              </FormGroup>
            </Col>
          </div>
          <hr />
          <div className="row">
            <Col lg={3}>
              <h4 className="role-title"><strong>Response</strong></h4>
            </Col>
            <Col lg={9}>
              <FormGroup>
                <ControlLabel>Response type</ControlLabel>
                <FormControl
                  name="responseType"
                  componentClass="select"
                  placeholder="Response type"
                  onChange={this.handleOnChange}>
                  <option value="accept">Accept</option>
                  <option value="reject">Reject</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Message</ControlLabel>
                <FormControl
                  name="responseMessage"
                  componentClass="textarea"
                  placeholder="Response message"
                  onChange={this.handleOnChange}
                  />
              </FormGroup>
              <div className="form-actions">
                {submitResult === 'OK' && <Alert bsStyle="success">Response submitted</Alert>}
                {submitResult === AsyncResultCode.NOT_A_PENDING_REQUEST && <Alert bsStyle="danger">Error! Request is not a pending request</Alert>}
                <Button
                  bsStyle="warning"
                  onClick={this.handleSubmit}
                  disabled={isSubmitting}>
                  Submit response
                  </Button>
              </div>
            </Col>
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

export default FormResponseToRequest;