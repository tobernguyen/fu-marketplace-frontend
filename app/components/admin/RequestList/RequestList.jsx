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
    const {page = 1, size = 10, changePageSize } = this.props;
    const previousButtonClass = classNames({
      'disabled': Number(page) === 1
    });
    const nextButtonClass = classNames({
      'disabled': this.props.requests.length < size
    });
    return (
      <div>
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
              request={request} />
          )}
          </tbody>
        </table>
        <nav>
          <div className="pull-left">
            <label>
              <FormattedMessage {...messages.requestList.tableFooter.pageSize} />
              <select className="form-control" onChange={changePageSize} value={size}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <FormattedMessage {...messages.requestList.tableFooter.pageSizeUnit}/>
            </label>
          </div>
          <div className="pull-right">
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to='/admin/shops' query={{ page: Number(page) - 1, size}}>
                  <FormattedMessage {...messages.requestList.button.previous} />
                </Link>
              </li>
              <li className={nextButtonClass}>
              <Link to='/admin/shops' query={{ page: Number(page) + 1, size}}>
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
