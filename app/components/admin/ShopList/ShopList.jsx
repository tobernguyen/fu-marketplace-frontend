import React, { Component } from 'react';
import ShopListRow from 'app/components/admin/ShopListRow';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import './ShopList.scss';
import classNames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/ShopList/ShopList.i18n';


class ShopList extends Component {
  render() {
    const {page = 1, size = 20, changePageSize } = this.props;
    const previousButtonClass = classNames({
      'disabled': Number(page) === 1
    });
    const nextButtonClass = classNames({
      'disabled': this.props.shops.length < size
    });
    return (
      <div className="container-fluid">
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th className="col-lg-3"><FormattedMessage {...messages.shopList.tableHead.name}/></th>
              <th className="col-lg-2"><FormattedMessage {...messages.shopList.tableHead.owner}/></th>
              <th className="col-lg-3"><FormattedMessage {...messages.shopList.tableHead.shipPlaces}/></th>
              <th className="col-lg-1"><FormattedMessage {...messages.shopList.tableHead.opening}/></th>
              <th className="col-lg-1"><FormattedMessage {...messages.shopList.tableHead.status}/></th>
              <th className="col-lg-1"><FormattedMessage {...messages.shopList.tableHead.action}/></th>
            </tr>
          </thead>
          <tbody>
            {this.props.shops.map(shop =>
              <ShopListRow key={shop.id} shop={shop} />
            )}
          </tbody>
        </Table>
        <nav>
          <div className="pull-left">
            <label>
              <FormattedMessage {...messages.shopList.tableFooter.pageSize} />
              <select className="form-control" onChange={changePageSize} value={size}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <FormattedMessage {...messages.shopList.tableFooter.pageSizeUnit}/>
            </label>
          </div>
          <div className="pull-right">
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to='/admin/shops' query={{ page: Number(page) - 1, size}}>
                  <FormattedMessage {...messages.shopList.button.previous} />
                </Link>
              </li>
              <li className={nextButtonClass}>
              <Link to='/admin/shops' query={{ page: Number(page) + 1, size}}>
                <FormattedMessage {...messages.shopList.button.next} />
              </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

    );
  }
}

ShopList.defaultProps = {
  shops: []
};

export default injectIntl(ShopList);
