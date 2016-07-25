import React from 'react';
import { connect } from 'react-redux';
import UserList from 'app/components/admin/UserList';
import { adminGetUsers } from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import { withRouter } from 'react-router'

class UserListContainer extends React.Component {
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
      this.props.router.push(`/admin/users?page=${page}&size=${size}`)
    }
  }

  componentWillMount() {
    this.props.adminGetUsers(this.state.page, this.state.size);
  }

  componentWillReceiveProps(nextProps) {
    const { page, size } = nextProps.location.query;

    if(page != this.state.page || size != this.state.size) {
      this.props.adminGetUsers(page, size);
      this.setState({
        page,
        size
      });
    }
  }

  render() {
    const { userManagement } = this.props;
    const { page, size} = this.state;
    if(userManagement.isFetching) {
      return (
        <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div>
          <UserList users={userManagement.userList}
            page={page}
            size={size}
            changePageSize={this.changePageSize}
          />
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => ({
   userManagement: state.admin.userManagement
});

UserListContainer.path = '/users';
UserListContainer.title = {
  id: 'breadCrumb.userManagement.title',
  defaultMessage: 'User management'
};
UserListContainer.description = {
  id: 'breadCrumb.userManagement.description',
  defaultMessage: ' '
};
UserListContainer.faIcon = 'fa-users';

export default connect(mapStateToProps, {
  adminGetUsers
})(withRouter(UserListContainer));
