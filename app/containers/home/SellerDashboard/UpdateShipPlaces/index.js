import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormUpdateShipPlaces from 'app/components/home/FormUpdateShipPlaces';
import { toggleShipPlace, updateShipPlaces, resetUpdatedItemStatus } from 'app/actions/shop';
import { getSellerShopShipPlaces } from 'app/selectors';


class UpdateShipPlaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shipPlacesUpdated: false
    };

    this.submitShipPlaces = () => {
      console.log(this.props.places);
      const placeIDs = this.props.places.filter((place) =>
        place.checked
      ).map((place) =>
        place.id
      );
      debugger;
      this.props.updateShipPlaces(this.props.params.shopID, placeIDs);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shipPlacesUpdated) {
      this.setState({
        shipPlacesUpdated: nextProps.shipPlacesUpdated
      });
      this.props.resetUpdatedItemStatus();
    }
  }

  render() {
    console.log(this.props.places);
    return (
      <FormUpdateShipPlaces shopID={this.props.params.shopID}
                            places={this.props.places}
                            shipPlacesUpdated={this.state.shipPlacesUpdated}
                            toggleShipPlace={this.props.toggleShipPlace}
                            handleSubmit={this.submitShipPlaces} />
    );
  }
}
const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    places: getSellerShopShipPlaces(state),
    shipPlacesUpdated: shop.shipPlacesUpdated
  }
};

UpdateShipPlaces.propTypes = {
  toggleShipPlace:	      PropTypes.func.isRequired,
  updateShipPlaces:	      PropTypes.func.isRequired,
  resetUpdatedItemStatus:	PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  toggleShipPlace,
  updateShipPlaces,
  resetUpdatedItemStatus
})(UpdateShipPlaces)
