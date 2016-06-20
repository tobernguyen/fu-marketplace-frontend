import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class BlockSellerDashboardSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opening: false
    };

    this.openingStatusChanged = () => {
      const newShopStatus = {
        opening: !this.state.opening
      };

      this.setState({
        opening: !this.state.opening
      });

      this.props.shopInfoChanged(newShopStatus);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellerShop) {
      const { opening } = nextProps.sellerShop;
      if (this.state.opening !== opening) {
        this.setState({
          opening: opening
        })
      }
    }
  }

  render() {
    const { shopID } = this.props;
    return (
      <ListGroup>
        <ListGroupItem href="#">
          <div className="checkbox checkbox-slider--b checkbox-slider-">
            <label>
              <input type="checkbox"
                     checked={this.state.opening}
                     onChange={this.openingStatusChanged} /><span>Shop opening status</span>
            </label>
          </div>
        </ListGroupItem>
        <LinkContainer to={`/shops/${shopID}/dashboard/info`}>
          <ListGroupItem>Update shop description</ListGroupItem>
        </LinkContainer>
        <ListGroupItem href="#">Manage selling items</ListGroupItem>
      </ListGroup>
    )
  }
}


BlockSellerDashboardSideBar.propTypes = {
  shopInfoChanged:  PropTypes.func.isRequired,
  sellerShop:       PropTypes.object.isRequired
};
