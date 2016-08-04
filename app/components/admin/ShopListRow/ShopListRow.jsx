import React from 'react';
import { Link } from 'react-router';
import './ShopListRow.scss';
import LabelShopOpening from 'app/components/admin/LabelShopOpening';
import LabelShopStatus from 'app/components/admin/LabelShopStatus';
import classNames from 'classnames';
import _ from 'lodash';

const ShopListRow = ({ shop }) => {
  const rowClassName = classNames({
    'banned': shop.banned
  });
  const ShipPlacesArray = ['', 'Dom A', 'Dom B', 'Dom C', 'Dom D', 'Dom E', 'Dom F'];
  const shipPlaces = _.sortBy(shop.shipPlaces, (shipPlace) => { return shipPlace });
  return (
    <tr className={rowClassName}>
      <td>{shop.id}</td>
      <td>{shop.name}</td>
      <td><Link to={`/admin/users/${shop.seller.id}/edit`}>{shop.seller.fullName}</Link></td>
      <td>{shipPlaces.map(shipPlace =>
        <div key={shipPlace} className="ship-place-span text-center">{ShipPlacesArray[shipPlace]}</div>
      )}</td>
      <td>
        <LabelShopOpening status={shop.opening} />
      </td>
      <td>
        <LabelShopStatus status={shop.status} />
      </td>
      <td className="actions">
        <Link className="btn btn-warning" to={`/admin/shops/${shop.id}/edit`} bsStyle="warning">
          <i className="fa fa-pencil-square-o"></i>
        </Link>
      </td>
    </tr>
  );
}

ShopListRow.defaultProps = {
  shop: {}
}

export default ShopListRow;
