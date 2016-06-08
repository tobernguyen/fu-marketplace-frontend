import React, { PropTypes, Component } from 'react';


export default class FormRequestCreateShopOwner extends Component {
  render() {
    const {
      fields: { phone, identityNumber },
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${phone.touched && phone.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Phone</label>
          <input type="text" className="form-control" {...phone} />
          <div className="help-block">
            {phone.touched ? phone.error : ''}
          </div>
        </div>

        <div className={`form-group ${identityNumber.touched && identityNumber.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Identity number</label>
          <input type="text" className="form-control" {...identityNumber} />
          <div className="help-block">
            {identityNumber.touched ? identityNumber.error : ''}
          </div>
        </div>
        <div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Next <i className="fa fa-chevron-right"/>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

FormRequestCreateShopOwner.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
