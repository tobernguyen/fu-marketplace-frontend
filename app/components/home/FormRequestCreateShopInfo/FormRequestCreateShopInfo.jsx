import React, { PropTypes, Component } from 'react';

export default class FormRequestCreateShopInfo extends Component {
  render() {
    const {
      fields: { shopName, description, headOffice },
      handleSubmit,
      previousPage,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${shopName.touched && shopName.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Shop name</label>
          <input type="text" className="form-control" {...shopName} />
          <div className="help-block">
            {shopName.touched ? shopName.error : ''}
          </div>
        </div>

        <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Description</label>
          <input type="text" className="form-control" {...description} />
          <div className="help-block">
            {description.touched ? description.error : ''}
          </div>
        </div>

        <div className={`form-group ${headOffice.touched && headOffice.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Head office</label>
          <input type="text" className="form-control" {...headOffice} />
          <div className="help-block">
            {headOffice.touched ? headOffice.error : ''}
          </div>
        </div>

        <div className="form-group">
          <button type="button" disabled={submitting} onClick={previousPage} className="btn btn-primary">
            <i className="fa fa-chevron-left"/> Previous
          </button>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? <i className="fa fa-spinner" /> : <i className="fa fa-paper-plane"/>} Finish
          </button>
        </div>
      </form>
    );
  }
}

FormRequestCreateShopInfo.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};
