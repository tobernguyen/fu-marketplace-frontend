import React, { Component, PropTypes } from 'react';
import ShopListRow from 'app/components/admin/ShopListRow';
import './ShopList.scss';


export default class ShopList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Ship places</th>
              <th>Opening</th>
              <th>Status</th>
              <th>Ban Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.shops.map(shop =>
              <ShopListRow key={shop.id} shop={shop} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
