import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestList  from 'app/components/admin/RequestList';
import { adminGetRequests } from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerListRequest extends Component {
  componentWillMount() {
    this.props.adminGetRequests('');
  }
  
  render() {
    const { isFetching, requestList} = this.props.requestManagement;
    if(isFetching) {
      return <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    } else {
      return <RequestList requests={requestList} />;
    }
  }
}

const mapStateToProps = (state) => ({
  requestManagement: state.admin.requestManagement
});

ContainerListRequest.path = '/requests';
ContainerListRequest.title = 'Request management';
ContainerListRequest.description = 'Request management';
ContainerListRequest.faIcon = 'fa-shopping-bag';

export default connect(mapStateToProps, {
  adminGetRequests
})(ContainerListRequest);