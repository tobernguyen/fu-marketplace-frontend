import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormUpdateShipPlaces from 'app/components/home/FormUpdateShipPlaces';
import { toggleShipPlace, updateShipPlaces, resetUpdatedItemStatus } from 'app/actions/shop';


class UpdateShipPlaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shipPlacesUpdated: false
    };

    this.submitShipPlaces = (e) => {
      e.preventDefault();
      const placeIDs = this.props.places.filter((place) =>
        place.checked
      ).map((place) =>
        place.id
      );
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
    return (
      <FormUpdateShipPlaces shopID={this.props.params.shopID}
                            places={this.props.places}
                            shipPlacesUpdated={this.state.shipPlacesUpdated}
                            toggleShipPlace={this.props.toggleShipPlace} handleSubmit={this.submitShipPlaces} />
    );
  }
}
const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    places: shop.places,
    shipPlacesUpdated: shop.shipPlacesUpdated
  }
};


export default connect(mapStateToProps, {
  toggleShipPlace,
  updateShipPlaces,
  resetUpdatedItemStatus
})(UpdateShipPlaces)
