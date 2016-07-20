import React from 'react';
import { Link } from 'react-router';
import { FormattedTime, FormattedDate } from 'react-intl';
import LabelPromotionType from 'app/components/admin/LabelPromotionType';
import classNames from 'classnames';

const PromotionListRow = ({ promotion, adminSelectShopPromotionCampaign }) => {
  const rowClassName = classNames({
    'banned': !promotion.active
  });
  return (
    <tr className={rowClassName}>
      <td>{promotion.id}</td>
      <td>
        <Link to={`/admin/shops/${promotion.shopId}/edit`}>
          {promotion.shop.name}
        </Link>
      </td>
      <td>
        <FormattedTime value={new Date(promotion.startDate)} /> {' '}
        <FormattedDate value={new Date(promotion.startDate)} />
      </td>
      <td>
        <FormattedTime value={new Date(promotion.endDate)} /> {' '}
        <FormattedDate value={new Date(promotion.endDate)} />
      </td>
      <td>
        <LabelPromotionType type={promotion.type} />
      </td>
      <td className="actions">
        <Link className="btn btn-warning" to={`/admin/promotions/${promotion.id}/edit`} bsStyle="warning" onClick={() => adminSelectShopPromotionCampaign(promotion)}>
          <i className="fa fa-pencil-square-o"></i>
        </Link>
      </td>
    </tr>
  );
}

PromotionListRow.defaultProps = {
  promotion: {}
}

export default PromotionListRow;
