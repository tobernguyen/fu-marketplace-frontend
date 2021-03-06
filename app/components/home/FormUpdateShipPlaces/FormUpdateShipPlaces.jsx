import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import ModalHeader from '../ModalHeader';
import './FormUpdateShipPlaces.scss';
import { Alert } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { buttons } from 'app/shared/buttons';
import { messages } from './FormUpdateShipPlaces.i18n';
import CheckBoxShipPlace from './CheckBoxShipPlace';

class FormUpdateShipPlaces extends Component {
  render() {
    const { shopID, places, toggleShipPlace, handleSubmit, formSubmitting } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className="form-update-ship-places">
        <ModalHeader
          title={formatMessage(messages.modalTitle)}
          closeLink={`/dashboard/shops/${shopID}`}
        />
        <Modal.Body className="clearfix">
          {this.props.shipPlacesUpdated && <Alert bsStyle="success">
            <FormattedMessage {...messages.shipPlaces.updated}/>
          </Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <ul className="places nav">
                {places.map(place =>
                  <li key={place.id}>
                    <CheckBoxShipPlace place={place} toggleShipPlace={toggleShipPlace} />
                  </li>
                )}
              </ul>
            </div>
            <button type="submit"
                    className="btn btn-primary" disabled={formSubmitting}>
              <FormattedMessage {...buttons.submit}/>{' '}
              {formSubmitting && <i className="fa fa-spinner fa-spin"/>}
            </button>
          </form>
        </Modal.Body>
      </div>
    );
  }
}

FormUpdateShipPlaces.propTypes = {
  intl: intlShape,
  places: PropTypes.array.isRequired,
  shipPlacesUpdated: PropTypes.bool.isRequired,
  formSubmitting: PropTypes.bool.isRequired
};

export default injectIntl(FormUpdateShipPlaces);
