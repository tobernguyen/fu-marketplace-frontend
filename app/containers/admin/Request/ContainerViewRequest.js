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
  }

  componentWillMount() {
    this.props.adminGetRequests();
  }

  render() {
    const { params, requestManagement, adminAcceptRequest, adminRejectRequest} = this.props;
    if(requestManagement.isFetching || requestManagement.isSubmitting) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return (
        <div className="container-fluid">
          <FormResponseToRequest
            requestId={params.requestId}
            requestList={requestManagement.requestList}
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
ContainerViewRequest.title = 'View request';
ContainerViewRequest.description = 'View and response to request';
ContainerViewRequest.faIcon = 'fa-mail-reply';

const mapStateToProps = (state) => ({
  requestManagement: state.admin.requestManagement
});

export default connect(mapStateToProps, {
  adminGetRequests,
  adminAcceptRequest,
  adminRejectRequest
})(ContainerViewRequest);
