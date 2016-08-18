import React from 'react';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';

const BlockMyOrderFooter = ({ page = 1, size = 5 , changePageSize, nextPage, prevPage, hasNextPage}) => {
  const previousButtonClass = classNames({
    'disabled': Number(page) === 1
  });
  const nextButtonClass = classNames({
    'disabled': !hasNextPage
  });
  return (
    <nav>
      <div className="pull-left">
        <label>
          <FormattedMessage {...messages.myOrder.tableFooter.pageSize} />
          <select className="form-control" onChange={changePageSize} value={size}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <FormattedMessage {...messages.myOrder.tableFooter.pageSizeUnit}/>
        </label>
      </div>
      <div className="pull-right">
        <ul className="pager">
          <li className={previousButtonClass}>
            <a onClick={prevPage}>
              <FormattedMessage {...messages.myOrder.tableFooter.button.previous} />
            </a>
          </li>
          <li className={nextButtonClass}>
            <a onClick={nextPage}>
              <FormattedMessage {...messages.myOrder.tableFooter.button.next} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default injectIntl(BlockMyOrderFooter);
