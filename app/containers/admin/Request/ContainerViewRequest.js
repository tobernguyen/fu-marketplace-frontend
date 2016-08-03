import React, { Component } from 'react';
import FormResponseToRequest from 'app/components/admin/FormResponseToRequest';
import {
  adminGetRequests,
  adminAcceptRequest,
  adminRejectRequest
} from 'app/actions/admin';
import { connect } from 'react-redux';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerViewRequest extends Component {
  constructor(props) {
    super(props);



    const { requestManagement: {selectedRequest}} = props;
    this.state = {
      request: selectedRequest
    }

    if(!selectedRequest || !selectedRequest.seller) {
      this.props.adminGetRequests(1, 9999);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params: { requestId },requestManagement: { isFetching, requestList } } = nextProps;
    if(isFetching === false) {
      const request = requestList.filter((request) => {
        return request.id == requestId
      });
      this.setState({
        request: request[0]
      });
    }
  }

  render() {
    const { requestManagement, adminAcceptRequest, adminRejectRequest} = this.props;
    if(requestManagement.isFetching) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return (
        <div className="container-fluid">
          <FormResponseToRequest
            request={this.state.request}
            acceptRequest={adminAcceptRequest}
            rejectRequest={adminRejectRequest}
            isSubmitting={requestManagement.isSubmitting}
            submitResult={requestManagement.submitResult}
            />
        </div>
      );
    }
  }
}

ContainerViewRequest.path = ':requestId/view';
ContainerViewRequest.title = {
  id: 'breadCrumb.viewRequest.title',
  defaultMessage: 'Response to request'
};
ContainerViewRequest.description = {
  id: 'breadCrumb.viewRequest.description',
  defaultMessage: 'Reponse to user request'
};
ContainerViewRequest.faIcon = 'fa-mail-reply';

const mapStateToProps = (state) => ({
  requestManagement: state.admin.requestManagement
});

export default connect(mapStateToProps, {
  adminGetRequests,
  adminAcceptRequest,
  adminRejectRequest
})(ContainerViewRequest);
