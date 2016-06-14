import React, { Component, PropTypes } from 'react';
import ShopListRow from 'app/components/admin/ShopListRow';
import { Panel, Table } from 'react-bootstrap';
import './ShopList.scss';


export default class ShopList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="container-fluid">
        <Table striped condensed hover>
          <thead>
            <tr>
              <th className="col-lg-1">#</th>
              <th className="col-lg-2">Name</th>
              <th className="col-lg-1">Owner</th>
              <th className="col-lg-4">Ship places</th>
              <th className="col-lg-1">Opening</th>
              <th className="col-lg-1">Status</th>
              <th className="col-lg-1">Ban Status</th>
              <th className="col-lg-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.shops.map(shop =>
              <ShopListRow key={shop.id} shop={shop} />
            )}
          </tbody>
        </Table>
      </div>
        
    );
  }
}
