import React, { Component } from 'react';
import RequestListRow from 'app/components/admin/RequestListRow';
import './RequestList.scss';
import classNames from 'classnames';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/RequestList/RequestList.i18n';

class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequest: {}
    };
  }

  render() {
    const {page = 1, size = 20, changePageSize } = this.props;
    const previousButtonClass = classNames({
      'disabled': Number(page) === 1
    });
    const nextButtonClass = classNames({
      'disabled': this.props.requests.length < size
    });
    return (
      <div className="container-fluid">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.requestList.tableHead.name} /></th>
              <th><FormattedMessage {...messages.requestList.tableHead.requester} /></th>
              <th><FormattedMessage {...messages.requestList.tableHead.status} /></th>
              <th><FormattedMessage {...messages.requestList.tableHead.action} /></th>
            </tr>
          </thead>
          <tbody>
          {this.props.requests.map(request =>
            <RequestListRow
              key={request.id}
              request={request}
              adminSelectRequest={this.props.adminSelectRequest}
              />
          )}
          </tbody>
        </table>
        <nav>
          <div className="pull-left">
            <label>
              <FormattedMessage {...messages.requestList.tableFooter.pageSize} />
              <select className="form-control" onChange={changePageSize} value={size}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <FormattedMessage {...messages.requestList.tableFooter.pageSizeUnit}/>
            </label>
          </div>
          <div className="pull-right">
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to='/admin/requests' query={{ page: Number(page) - 1, size}}>
                  <FormattedMessage {...messages.requestList.button.previous} />
                </Link>
              </li>
              <li className={nextButtonClass}>
              <Link to='/admin/requests' query={{ page: Number(page) + 1, size}}>
                <FormattedMessage {...messages.requestList.button.next} />
              </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

RequestList.defaultProps = {
  requests: []
};

export default injectIntl(RequestList);
