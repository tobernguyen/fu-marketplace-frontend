import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import ModalHeader from '../ModalHeader';
import OptionItem from 'app/components/common/OptionItem';
import './FormUpdateShipPlaces.scss';
import { Alert } from 'react-bootstrap';

export default class FormUpdateShipPlaces extends Component {
  render() {
    const { shopID, places, toggleShipPlace, handleSubmit } = this.props;
    return (
      <div className="form-update-ship-places">
        <ModalHeader
          title="Update ship places"
          closeLink={`/shops/${shopID}/dashboard`}
        />
        <Modal.Body className="clearfix">
          {this.props.shipPlacesUpdated && <Alert bsStyle="success">
            Ship places are updated.
          </Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <ul className="places nav">
                {places.map(place =>
                  <li key={place.id}>
                    <OptionItem item={place} toggleItem={toggleShipPlace} />
                  </li>
                )}
              </ul>
            </div>
            <button type="submit"
                    className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </div>
    );
  }
}

FormUpdateShipPlaces.propTypes = {
  places: PropTypes.array.isRequired,
  shipPlacesUpdated: PropTypes.bool.isRequired
};
