import React from 'react';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';

const BlockMyOrderFooter = ({ page = 1, orders = [], size= 10 , changePageSize}) => {
  const previousButtonClass = classNames({
    'disabled': Number(page) === 1
  });
  const nextButtonClass = classNames({
    'disabled': orders.length < size
  });
  return (
    <nav>
      <div className="pull-left">
        <label>
          <FormattedMessage {...messages.myOrder.tableFooter.pageSize} />
          <select className="form-control" onChange={changePageSize} value={size}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <FormattedMessage {...messages.myOrder.tableFooter.pageSizeUnit}/>
        </label>
      </div>
      <div className="pull-right">
        <ul className="pager">
          <li className={previousButtonClass}>
            <Link to='/orders' query={{ size, page: Number(page) - 1, size}} >
              <FormattedMessage {...messages.myOrder.tableFooter.button.previous} />
            </Link>
          </li>
          <li className={nextButtonClass}>
            <Link to='/orders' query={{ size, page: Number(page) + 1 }} >
              <FormattedMessage {...messages.myOrder.tableFooter.button.next} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default injectIntl(BlockMyOrderFooter);
