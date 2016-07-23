import React from 'react';
import { messages } from 'app/components/home/BlockMyTicket/BlockMyTicket.i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';

const BlockMyTicketFooter = ({ page = 1, tickets = [], size = 5 , changePageSize, nextPage, prevPage}) => {
  const previousButtonClass = classNames({
    'disabled': Number(page) === 1
  });
  const nextButtonClass = classNames({
    'disabled': tickets.length < size
  });
  return (
    <nav>
      <div className="pull-left">
        <label>
          <FormattedMessage {...messages.blockMyTicket.table.footer.pageSize} />
          <select className="form-control" onChange={changePageSize} value={size}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <FormattedMessage {...messages.blockMyTicket.table.footer.pageSizeUnit}/>
        </label>
      </div>
      <div className="pull-right">
        <ul className="pager">
          <li className={previousButtonClass}>
            <a onClick={prevPage}>
              <FormattedMessage {...messages.blockMyTicket.table.footer.button.previous} />
            </a>
          </li>
          <li className={nextButtonClass}>
            <a onClick={nextPage}>
              <FormattedMessage {...messages.blockMyTicket.table.footer.button.next} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default injectIntl(BlockMyTicketFooter);
