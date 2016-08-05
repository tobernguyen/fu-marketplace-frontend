import React, { Component, PropTypes } from 'react';
import UserListRow from 'app/components/admin/UserListRow';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import './UserList.scss';
import classNames from 'classnames';
import { messages } from 'app/components/admin/UserList/UserList.i18n';

class UserList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {page = 1, size = 20, changePageSize } = this.props;
    const previousButtonClass = classNames({
      'disabled': Number(page) === 1
    });
    const nextButtonClass = classNames({
      'disabled': this.props.users.length < size
    });
    return (
      <div className="container-fluid">
        <Table striped condensed hover>
          <thead>
            <tr>
              <th className="col-lg-1">#</th>
              <th className="col-lg-3"><FormattedMessage {...messages.userList.tableHead.email} /></th>
              <th className="col-lg-3"><FormattedMessage {...messages.userList.tableHead.fullName} /></th>
              <th className="col-lg-3"><FormattedMessage {...messages.userList.tableHead.role} /></th>
              <th className="col-lg-1"><FormattedMessage {...messages.userList.tableHead.action} /></th>
            </tr>
          </thead>
          <tbody>
          {this.props.users.map(user =>
            <UserListRow key={user.id} user={user} />
          )}
          </tbody>
        </Table>
        <nav>
          <div className="pull-left">
            <label>
              <FormattedMessage {...messages.userList.tableFooter.pageSize} />
              <select className="form-control" onChange={changePageSize} value={size}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <FormattedMessage {...messages.userList.tableFooter.pageSizeUnit}/>
            </label>
          </div>
          <div className="pull-right">
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to='/admin/users' query={{ page: Number(page) - 1, size}}>
                  <FormattedMessage {...messages.userList.button.previous} />
                </Link>
              </li>
              <li className={nextButtonClass}>
              <Link to='/admin/users' query={{ page: Number(page) + 1, size}}>
                <FormattedMessage {...messages.userList.button.next} />
              </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

UserList.defaultProps = {
  users: []
};

export default injectIntl(UserList);
