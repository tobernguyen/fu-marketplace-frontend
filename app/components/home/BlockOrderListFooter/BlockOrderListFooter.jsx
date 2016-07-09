import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockOrderListFooter/BlockOrderListFooter.i18n';
import './BlockOrderListFooter.scss';
import classNames from 'classnames';
const BlockOrderListFooter = ({ shopID, query, hasNextPage, changePageSize }) => {
  const status = query.status || 'all';
  const size = query.size || 10;
  const page = query.page || 1;

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
          <Link className={previousButtonClass} to={`/shops/${shopID}/dashboard/orders`} query={{ status, size, page: Number(page) - 1 }}>
            <span aria-hidden="true">&larr;</span><FormattedMessage {...messages.orderListFooter.previous}/>
          </Link>
          </li>
          <li>
            <Link className={nextButtonClass} to={`/shops/${shopID}/dashboard/orders`} query={{ status, size, page: Number(page) + 1 }}>
              <FormattedMessage {...messages.orderListFooter.next}/><span aria-hidden="true">&rarr;</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="pull-right">
        <label>
          <FormattedMessage {...messages.orderListFooter.pageSize} />
          <select className="form-control" onChange={changePageSize}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <FormattedMessage {...messages.orderListFooter.pageSizeUnit}/>
        </label>
      </div>
    </div>
  );
};

export default injectIntl(BlockOrderListFooter);