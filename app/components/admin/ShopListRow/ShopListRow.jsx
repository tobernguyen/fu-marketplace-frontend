import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './ShopListRow.scss';

class ShopListRow extends Component {
  constructor(props, context) {
    super(props,context);
  }

  render() {
    return (
      <tr>
        <td>{this.props.shop.id}</td>
        <td>{this.props.shop.name}</td>
        <td>{this.props.shop.address || 'N/A'}</td>
        <td>{this.props.shop.shipPlaces.map(shipPlace =>
          <span key={shipPlace.id}>|{shipPlace.name}|</span>
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

export default ShopListRow;
