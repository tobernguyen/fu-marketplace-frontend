import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestList  from 'app/components/admin/RequestList';
import NoRequest  from 'app/components/admin/RequestList/NoRequest.jsx';
import { adminGetRequests } from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { withRouter } from 'react-router'
class ContainerListRequest extends Component {
  constructor(props) {
    super(props);

    const { page, size } = this.props.location.query;

    this.state = {
      page: page || 1,
      size: size || 20
    };

    this.changePageSize = (e) => {
      const size = e.target.value;
      const { query } = this.props.location;
      const page = query.page || 1;
      this.props.router.push(`/admin/requests?page=${page}&size=${size}`)
    }
  }
  componentWillMount() {
    this.props.adminGetRequests(this.state.page, this.state.size);
  }

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps.location;
    const page = query.page || 1;
    const size = query.size || 20;
    if(page != this.state.page || size != this.state.size) {
      this.props.adminGetRequests(page, size);
      this.setState({
        page,
        size
      });
    }
  }

  render() {
    const { isFetching, requestList} = this.props.requestManagement;
    const { page, size} = this.state;
    let output = '';
    if(isFetching) {
      output = <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    } else {
      if(requestList.length === 0) {
        output = <NoRequest />
      } else {
        output = <div>
          <RequestList
            requests={requestList}
            page={page}
            size={size}
            changePageSize={this.changePageSize}
            />;
        </div>
      }

    }

    return output;
  }
}

const mapStateToProps = (state) => ({
  requestManagement: state.admin.requestManagement
});

ContainerListRequest.path = '/requests';
ContainerListRequest.title = {
  id: 'breadCrumb.requestManagement.title',
  defaultMessage: 'Request management'
};
ContainerListRequest.description = {
  id: 'breadCrumb.requestManagement.description',
  defaultMessage: 'List of user request'
};
ContainerListRequest.faIcon = 'fa-envelope';

export default connect(mapStateToProps, {
  adminGetRequests
})(withRouter(ContainerListRequest));
