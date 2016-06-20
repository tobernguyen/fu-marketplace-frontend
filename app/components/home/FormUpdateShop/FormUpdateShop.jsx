import React, { Component, PropTypes } from 'react';
import ModalHeader from '../ModalHeader';
import { Modal, Alert } from 'react-bootstrap';

export default class UpdateShopForm extends Component {
  render() {
    const { shopID, fields: { description }, handleSubmit, submitting, dirty, shopUpdated } = this.props;
    return (
      <div className="form-update-shop">
        <ModalHeader
          title="Update shop information"
          closeLink={`/shops/${shopID}/dashboard`}
        />
        <Modal.Body className="clearfix">
          {shopUpdated && <Alert bsStyle="success">
            <p>Shop information updated.</p>
          </Alert>}
          <form onSubmit={handleSubmit}>
            <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
              <label>
                Shop Description
              </label>
              <textarea
                className="form-control" {...description} />
              <div className="help-block">
                {description.touched ? description.error : ''}
              </div>
            </div>
            <button type="submit"
                    className="btn btn-primary"
                    disabled={submitting || !dirty}>
              Submit
            </button>
          </form>
        </Modal.Body>
      </div>
    );
  }
}

UpdateShopForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};
