import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import ModalHeader from '../ModalHeader';

export default class FormUpdateShipPlaces extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shopID } = this.props;
    return (
      <div className="form-update-ship-places">
        <ModalHeader
          title="Update ship places"
          closeLink={`/shops/${shopID}/dashboard`}
        />
        <Modal.Body className="clearfix">
          <form>
            <div className="form-group">
              <label>
                Ship places
              </label>

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
