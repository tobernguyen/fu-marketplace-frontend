import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './ShopListRow.scss';

class ShopListRow extends Component {
  constructor(props, context) {
    super(props,context);
  }

  render() {
    const ShipPlacesArray = ['', 'Dom A', 'Dom B', 'Dom C', 'Dom D', 'Dom E', 'Dom F'];
    return (
      <tr>
        <td>{this.props.shop.id}</td>
        <td>{this.props.shop.name}</td>
        <td><Link to={`admin/users/${this.props.shop.seller.id}/edit`}>{this.props.shop.seller.fullName}</Link></td>
        <td>{this.props.shop.shipPlaces.map(shipPlace =>
          <div key={shipPlace} className="ship-place-span text-center">{ShipPlacesArray[shipPlace]}</div>
        )}</td>
        <td>{this.props.shop.opening ? 'Open' : 'Close'}</td>
        <td>{this.props.shop.status}</td>
        <td>{this.props.shop.banned ? 'Banned' : 'Not Banned'}</td>
        <td className="actions">
          <Link className="btn btn-warning" to={`admin/shops/${this.props.shop.id}/edit`} bsStyle="warning">
            <i className="fa fa-pencil-square-o"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

ShopListRow.defaultProps = {
  shop: {}
}

export default ShopListRow;
