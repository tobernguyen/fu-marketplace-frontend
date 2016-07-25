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

  componentDidMount() {
    const { opening } = this.props.sellerShop;
    if (opening !== undefined && (this.state.opening !== opening)) {
      this.setState({
        opening: opening
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellerShop) {
      const { opening } = nextProps.sellerShop;
      if (opening !== undefined && this.state.opening !== opening) {
        this.setState({
          opening: opening
        })
      }
    }
  }

  render() {
    const shopID = this.props.sellerShop.id;
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
        <LinkContainer to={`/dashboard/shops/${shopID}/info`}>
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
        <LinkContainer to={`/dashboard/shops/${shopID}/items/add`}>
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
        <LinkContainer to={`/dashboard/shops/${shopID}/ship_places`}>
          <ListGroupItem>
            <div className="clearfix action">
              <div className="icon icon-blue">
                <i className="fa fa-paper-plane-o"/>
              </div>
              <div className="title">
                <FormattedMessage {...messages.updateShipPlaces} />
              </div>
            </div>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer to={`/dashboard/shops/${shopID}/orders`}>
          <ListGroupItem>
            <div className="clearfix action">
              <div className="icon icon-red">
                <i className="fa fa-bars"/>
              </div>
              <div className="title">
                <FormattedMessage {...messages.manageOrders} />
              </div>
            </div>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer to={`/dashboard/shops/${shopID}/statistics`}>
          <ListGroupItem>
            <div className="clearfix action">
              <div className="icon icon-yellow">
                <i className="fa fa-line-chart"/>
              </div>
              <div className="title">
                <FormattedMessage {...messages.statistics} />
              </div>
            </div>
          </ListGroupItem>
        </LinkContainer>
      </ListGroup>
    )
  }
}


BlockSellerDashboardSideBar.propTypes = {
  sellerShop: PropTypes.object.isRequired,
  shopInfoChanged: PropTypes.func.isRequired
};
