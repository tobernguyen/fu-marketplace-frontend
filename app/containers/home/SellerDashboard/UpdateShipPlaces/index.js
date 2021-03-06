import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormUpdateShipPlaces from 'app/components/home/FormUpdateShipPlaces';
import { updateShipPlaces, resetUpdatedItemStatus } from 'app/actions/shop';
import { getSellerShopShipPlaces } from 'app/selectors';
import _ from 'lodash';

class UpdateShipPlaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shipPlacesUpdated: false,
      shopShipPlaces: this.props.places || []
    };

    this.submitShipPlaces = (e) => {
      e.preventDefault();
      const placeIDs = this.state.shopShipPlaces.filter((place) =>
        place.checked
      ).map((place) =>
        place.id
      );
      this.props.updateShipPlaces(this.props.params.shopID, placeIDs);
    };

    this.toggleShipPlace = (item) => {
      const { shopShipPlaces } = this.state;
      this.setState({
        shopShipPlaces: _.map(shopShipPlaces, (place) => {
          if (place.id === item.id) {
            place.checked = !place.checked;
          }
          return place
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shipPlacesUpdated) {
      this.setState({
        shipPlacesUpdated: nextProps.shipPlacesUpdated
      });
      this.props.resetUpdatedItemStatus();
    }
    if (nextProps.places && nextProps.places.length > 0) {
      this.setState({
        shopShipPlaces: nextProps.places
      })
    }
  }

  render() {
    return (
      <FormUpdateShipPlaces shopID={this.props.params.shopID}
                            places={this.state.shopShipPlaces}
                            shipPlacesUpdated={this.state.shipPlacesUpdated}
                            toggleShipPlace={this.toggleShipPlace}
                            handleSubmit={this.submitShipPlaces}
                            formSubmitting={this.props.formSubmitting} />
    );
  }
}
const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    places: getSellerShopShipPlaces(state),
    shipPlacesUpdated: shop.shipPlacesUpdated,
    formSubmitting: shop.formSubmitting
  }
};

UpdateShipPlaces.propTypes = {
  updateShipPlaces:	      PropTypes.func.isRequired,
  resetUpdatedItemStatus:	PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  updateShipPlaces,
  resetUpdatedItemStatus
})(UpdateShipPlaces)
