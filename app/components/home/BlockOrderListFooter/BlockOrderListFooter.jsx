import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderListFooter/BlockOrderListFooter.i18n';
import './BlockOrderListFooter.scss';
import classNames from 'classnames';
const BlockOrderListFooter = ({ shopID, page, size , hasNextPage, changePageSize, nextPage, prevPage }) => {
  const previousButtonClass=classNames({
    'disabled': Number(page) === 1
  });

  const nextButtonClass=classNames({
    'disabled': hasNextPage
  });
  return (
    <div className="order-list-footer header clearfix">
      <div className="pull-left">
        <ul>
          <li>
          <Link className={previousButtonClass} to={`/dashboard/shops/${shopID}/orders`} onClick={prevPage}>
            <span aria-hidden="true">&larr;</span><FormattedMessage {...messages.orderListFooter.previous}/>
          </Link>
          </li>
          <li>
            <Link className={nextButtonClass} to={`/dashboard/shops/${shopID}/orders`} onClick={nextPage}>
              <FormattedMessage {...messages.orderListFooter.next}/><span aria-hidden="true">&rarr;</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="pull-right">
        <label>
          <FormattedMessage {...messages.orderListFooter.pageSize} />
          <select className="form-control" onChange={changePageSize} value={size}>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
          </select>
          <FormattedMessage {...messages.orderListFooter.pageSizeUnit}/>
        </label>
      </div>
    </div>
  );
};

export default injectIntl(BlockOrderListFooter);
