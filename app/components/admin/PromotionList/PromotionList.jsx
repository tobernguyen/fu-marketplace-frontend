import React, { Component } from 'react';
import PromotionListRow from './PromotionListRow.jsx';
import { messages } from './PromotionList.i18n';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router';

class PromotionList extends Component {
  render() {
    const {page = 1, size = 20, changePageSize } = this.props;
    const previousButtonClass = classNames({
      'disabled': Number(page) === 1
    });
    const nextButtonClass = classNames({
      'disabled': this.props.promotions.length < size
    });
    const { promotions, adminSelectShopPromotionCampaign } = this.props;
    return(
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.promotionList.tableHead.shop}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.startDate}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.endDate}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.type}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.action}/></th>
            </tr>
          </thead>
          <tbody>
            {promotions.length !== 0 && promotions.map(promotion =>
              <PromotionListRow key={promotion.id} promotion={promotion} adminSelectShopPromotionCampaign={adminSelectShopPromotionCampaign}/>
            )}
          </tbody>
        </table>
        <nav>
          <div className="pull-left">
            <label>
              <FormattedMessage {...messages.promotionList.tableFooter.pageSize} />
              <select className="form-control" onChange={changePageSize} value={size}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <FormattedMessage {...messages.promotionList.tableFooter.pageSizeUnit}/>
            </label>
          </div>
          <div className="pull-right">
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to='/admin/promotions' query={{ page: Number(page) - 1, size}}>
                  <FormattedMessage {...messages.promotionList.button.previous} />
                </Link>
              </li>
              <li className={nextButtonClass}>
              <Link to='/admin/promotions' query={{ page: Number(page) + 1, size}}>
                <FormattedMessage {...messages.promotionList.button.next} />
              </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default PromotionList;
