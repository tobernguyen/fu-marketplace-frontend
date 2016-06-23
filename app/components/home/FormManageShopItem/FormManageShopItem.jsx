import React, { Component, PropTypes } from 'react';
import ModalHeader from '../ModalHeader';
import { Modal, ButtonToolbar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { messages } from './FormManageShopItem.i18n';

class FormManageShopItem extends Component {
  constructor(props) {
    super(props);

    this.onDrop = files => {
      this.props.fields.imageData.onChange(files[0])
    }
  }

  render() {
    const {
      shopID,
      itemCategories,
      updateMode,
      onDelete,
      fields: { name, description, quantity, price, categoryId, imageData },
      handleSubmit,
      submitting,
      dirty,
      invalid } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className="form-manage-shop-item">
        <ModalHeader
          title={updateMode ? 'Update shop item' : 'Add shop item'}
          closeLink={`/shops/${shopID}/dashboard`}
        />
        <Modal.Body className="clearfix">
          <form onSubmit={handleSubmit} className="form-horizontal">
            <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopItem.name.label} />
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control" {...name}
                  placeholder={formatMessage(messages.shopItem.name.placeholder)} />
                <div className="help-block">
                  {name.touched && name.error ? <FormattedMessage {...name.error} /> : ''}
                </div>
              </div>
            </div>
            <div className={`form-group ${categoryId.touched && categoryId.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopItem.category} />
              </label>
              <div className="col-sm-9">
                <select className="form-control"
                  {...categoryId}
                  value={categoryId.value || ''}>
                  <option/>
                  {itemCategories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  })}
                </select>
                <div className="help-block">
                  {categoryId.touched && categoryId.error ? <FormattedMessage {...categoryId.error} /> : ''}
                </div>
              </div>
            </div>
            <div className={`form-group ${price.touched && price.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopItem.price.label} />
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control" {...price}
                  placeholder={formatMessage(messages.shopItem.price.placeholder)} />
                <div className="help-block">
                  {price.touched && price.error ? <FormattedMessage {...price.error} /> : ''}
                </div>
              </div>
            </div>
            <div className={`form-group ${quantity.touched && quantity.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopItem.quantity.label} />
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control" {...quantity}
                  placeholder={formatMessage(messages.shopItem.quantity.placeholder)} />
                <div className="help-block">
                  {quantity.touched && quantity.error ? <FormattedMessage {...quantity.error} /> : ''}
                </div>
              </div>
            </div>

            <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopItem.description.label} />
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control" {...description}
                  placeholder={formatMessage(messages.shopItem.description.placeholder)} />
                <div className="help-block">
                  {description.touched && description.error ? <FormattedMessage {...description.error} /> : ''}
                </div>
              </div>
            </div>

            <div className={`form-group ${imageData.touched && imageData.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.shopItem.photo.label} />
              </label>
              <div className="col-sm-9">
                <Dropzone
                  onDrop={this.onDrop}
                  className="dropzone"
                  activeStyle={{borderColor: 'red'}}
                  multiple={false}
                  accept="image/*">
                  <div>
                    {imageData.value ?
                    <img className="img-responsive" src={imageData.value.preview} /> : <span><FormattedMessage {...messages.shopItem.photo.description} /></span>}
                  </div>
                </Dropzone>
                <div className="help-block">
                  {imageData.error ? <FormattedMessage {...imageData.error} /> : ''}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-9 col-sm-offset-3">
                <ButtonToolbar>
                  <button type="submit"
                          className="btn btn-primary"
                          disabled={submitting || !dirty || invalid}>
                    {updateMode ? 'Update' : 'Add'}
                  </button>
                  {updateMode &&
                  <button className="btn btn-danger"
                          onClick={onDelete}>
                    Delete
                  </button>}
                </ButtonToolbar>
              </div>
            </div>
          </form>
        </Modal.Body>
      </div>
    );
  }
}

FormManageShopItem.propTypes = {
  intl: intlShape.isRequired,
  itemCategories: PropTypes.array.isRequired
};


export default injectIntl(FormManageShopItem)

