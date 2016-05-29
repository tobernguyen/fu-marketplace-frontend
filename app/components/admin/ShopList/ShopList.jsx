import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './ShopList.scss';

const mockData = [
  {
    id: 1,
    name: "Tadaaaa",
    shopOwner: "tobernguyen",
    type: "Food",
    banStatus: true
  }
]


export default class ShopList extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>ShopOwner</th>
            <th>Type</th>
            <th>Ban Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(shop =>
            <tr>
              <td>{shop.id}</td>
              <td>{shop.name}</td>
              <td>{shop.shopOwner}</td>
              <td>{shop.type}</td>
              <td>{shop.banStatus}</td>
              <td className="actions">
                <Button bsStyle="warning" onClick={this.toggleEditMode}>
                  <i className="fa fa-pencil-square-o"></i>
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
