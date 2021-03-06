import React, { Component, PropTypes } from 'react';
import ModalHeader from '../ModalHeader';
import { Modal, Alert } from 'react-bootstrap';
import './FormUpdateShop.scss';
import { messages } from './FormUpdateShop.i18n';
import { buttons } from 'app/shared/buttons';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';


class FormUpdateShop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shopID, fields: { description, status }, handleSubmit, formSubmitting, dirty, shopUpdated } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className="form-update-shop">
        <ModalHeader
          title={formatMessage(messages.modalTitle)}
          closeLink={`/dashboard/shops/${shopID}`}
        />
        <Modal.Body className="clearfix">
          {shopUpdated && <Alert bsStyle="success">
            <p>
              <FormattedMessage {...messages.shopInformation.updated}/>
            </p>
          </Alert>}
          <form onSubmit={handleSubmit} className="form-horizontal">
            <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopInformation.description}/>
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
                <FormattedMessage {...messages.shopInformation.publishStatus}/>
              </label>
              <div className="col-sm-9 publish-status">
                <div className="checkbox checkbox-slider--b control">
                  <label>
                    <input type="checkbox" {...status} /><span/>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-sm-offset-3 action">
              <button type="submit"
                      className="btn btn-primary"
                      disabled={formSubmitting || !dirty}>
                <FormattedMessage {...buttons.submit}/>{' '}
                {formSubmitting && <i className="fa fa-spinner fa-spin"/>}
              </button>
            </div>
          </form>
        </Modal.Body>
      </div>
    );
  }
}

FormUpdateShop.propTypes = {
  intl:           intlShape.isRequired,
  fields:         PropTypes.object.isRequired,
  handleSubmit:   PropTypes.func.isRequired,
  formSubmitting: PropTypes.bool.isRequired
};

export default injectIntl(FormUpdateShop)
