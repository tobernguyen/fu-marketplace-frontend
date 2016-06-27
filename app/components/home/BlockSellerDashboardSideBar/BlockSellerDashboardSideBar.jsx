import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './BlockSellerDashboardSideBar.scss';
import { messages } from './BlockSellerDashboardSideBar.i18n';
import { FormattedMessage } from 'react-intl';


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
      if (opening && (this.state.opening !== opening)) {
        this.setState({
          opening: opening
        })
      }
    }
  }

  render() {
    const { shopID } = this.props;
    return (
      <ListGroup className="block-seller-dashboard-sidebar">
        <ListGroupItem href="#">
          <div className="clearfix action">
            <div className="icon icon-orange">
              <i className="fa fa-check-circle-o"/>
            </div>
            <div className="title">
              <FormattedMessage {...messages.openingStatus} />
            </div>
            <div className="checkbox checkbox-slider--b control">
              <label>
                <input type="checkbox"
                       checked={this.state.opening}
                       onChange={this.openingStatusChanged} /><span/>
              </label>
            </div>
          </div>

        </ListGroupItem>
        <LinkContainer to={`/shops/${shopID}/dashboard/info`}>
          <ListGroupItem>
            <div className="clearfix action">
              <div className="icon icon-gray">
                <i className="fa fa-cog"/>
              </div>
              <div className="title">
                <FormattedMessage {...messages.updateShop} />
              </div>
            </div>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer to={`/shops/${shopID}/dashboard/items/add`}>
          <ListGroupItem>
            <div className="clearfix action">
              <div className="icon icon-green">
                <i className="fa fa-plus-square-o"/>
              </div>
              <div className="title">
                <FormattedMessage {...messages.addShopItem} />
              </div>
            </div>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer to={`/shops/${shopID}/dashboard/ship_places`}>
          <ListGroupItem>
            <div className="clearfix action">
              <div className="icon icon-blue">
                <i className="fa fa-paper-plane-o"/>
              </div>
              <div className="title">
                Update ship places
              </div>
            </div>
          </ListGroupItem>
        </LinkContainer>
      </ListGroup>
    )
  }
}


BlockSellerDashboardSideBar.propTypes = {
  shopInfoChanged:  PropTypes.func.isRequired,
  sellerShop:       PropTypes.object.isRequired
};
