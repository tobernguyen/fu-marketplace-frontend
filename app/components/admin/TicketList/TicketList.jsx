import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/TicketList/TicketList.i18n';
import TicketListRow from './TicketListRow.jsx';
import classNames from 'classnames';
import { Link } from 'react-router';

class TicketList extends Component {
  render() {

    const { tickets, page = 1, size = 20, changePageSize } = this.props;
    const previousButtonClass = classNames({
      'disabled': Number(page) === 1
    });
    const nextButtonClass = classNames({
      'disabled': this.props.tickets.length < size
    });
    return (
      <div className="container-fluid">
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.ticketList.table.header.user}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.shop}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.status}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.createdAt}/></th>
              <th><FormattedMessage {...messages.ticketList.table.header.action}/></th>
            </tr>
          </thead>
          <tbody>
          {tickets.map(ticket =>
            <TicketListRow ticket={ticket} key={ticket.id}/>
          )}
          </tbody>
        </table>
        <nav>
          <div className="pull-left">
            <label>
              <FormattedMessage {...messages.ticketList.table.tableFooter.pageSize} />
              <select className="form-control" onChange={changePageSize} value={size}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <FormattedMessage {...messages.ticketList.table.tableFooter.pageSizeUnit}/>
            </label>
          </div>
          <div className="pull-right">
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to='/admin/tickets' query={{ page: Number(page) - 1, size}}>
                  <FormattedMessage {...messages.ticketList.table.button.previous} />
                </Link>
              </li>
              <li className={nextButtonClass}>
              <Link to='/admin/tickets' query={{ page: Number(page) + 1, size}}>
                <FormattedMessage {...messages.ticketList.table.button.next} />
              </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default TicketList;
