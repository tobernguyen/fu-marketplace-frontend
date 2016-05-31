import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import './ShopListRow.scss';

class ShopListRow extends Component {
  constructor(props, context) {
    super(props,context);

    this.handleEditButtonClicked = this.handleEditButtonClicked.bind(this);
  }

  handleEditButtonClicked() {
    this.props.openEditModal(this.props.shop);
  }

  render() {
    return (
      <tr>
        <td>{this.props.shop.id}</td>
        <td>{this.props.shop.name}</td>
        <td>{this.props.shop.shopOwner}</td>
        <td>{this.props.shop.banStatus}</td>
        <td className="actions">
          <Button bsStyle="warning" onClick={this.handleEditButtonClicked}>
            <i className="fa fa-pencil-square-o"></i>
          </Button>
        </td>
      </tr>
    );
  }
}

export default ShopListRow;
