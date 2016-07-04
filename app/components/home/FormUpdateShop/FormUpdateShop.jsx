import React, { Component, PropTypes } from 'react';
import ModalHeader from '../ModalHeader';
import { Modal, Alert } from 'react-bootstrap';
import './FormUpdateShop.scss';


export default class UpdateShopForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shopID, fields: { description, status }, handleSubmit, submitting, dirty, shopUpdated } = this.props;
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
          <form onSubmit={handleSubmit} className="form-horizontal">
            <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                Shop Description
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control" {...description} />
                <div className="help-block">
                  {description.touched ? description.error : ''}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">
                Publish status
              </label>
              <div className="col-sm-9 publish-status">
                <div className="checkbox checkbox-slider--b control">
                  <label>
                    <input type="checkbox" {...status} /><span/>
                  </label>
                </div>
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
