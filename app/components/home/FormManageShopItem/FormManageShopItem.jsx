import React, { Component, PropTypes } from 'react';
import ModalHeader from '../ModalHeader';
import { Modal } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

export default class FormManageShopItem extends Component {
  constructor(props) {
    super(props);

    this.onDrop = files => {
      this.props.fields.imageData.onChange(files[0])
    }
  }

  render() {
    const { shopID, fields: { name, description, quantity, price, imageData }, handleSubmit, submitting, dirty } = this.props;
    return (
      <div className="form-manage-shop-item">
        <ModalHeader
          title="Add Shop Item"
          closeLink={`/shops/${shopID}/dashboard`}
        />
        <Modal.Body className="clearfix">
          <form onSubmit={handleSubmit} className="form-horizontal">
            <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-2 control-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control" {...name}
                  placeholder="What are you selling?" />
                <div className="help-block">
                  {name.touched ? name.error : ''}
                </div>
              </div>
            </div>
            <div className={`form-group ${price.touched && price.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-2 control-label">
                Price
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control" {...price}
                  placeholder="Add price" />
                <div className="help-block">
                  {price.touched ? price.error : ''}
                </div>
              </div>
            </div>
            <div className={`form-group ${quantity.touched && quantity.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-2 control-label">
                Quantity
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control" {...quantity}
                  placeholder="Add quantity (optional)" />
                <div className="help-block">
                  {quantity.touched ? quantity.error : ''}
                </div>
              </div>
            </div>

            <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-2 control-label">
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control" {...description}
                  placeholder="Describe your item (optional)" />
                <div className="help-block">
                  {description.touched ? description.error : ''}
                </div>
              </div>
            </div>

            <div className={`form-group ${imageData.touched && imageData.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-2 control-label">
                Photo
              </label>
              <div className="col-sm-10">
                <Dropzone
                  onDrop={this.onDrop}
                  className="dropzone"
                  activeStyle={{borderColor: 'red'}}
                  multiple={false}
                  accept="image/*">
                  <div>
                    {imageData.value ?
                    <img className="img-responsive" src={imageData.value.preview} /> : <span>Add Photo</span>}

                  </div>
                </Dropzone>
                <div className="help-block">
                  {imageData.error ? imageData.error : ''}
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
