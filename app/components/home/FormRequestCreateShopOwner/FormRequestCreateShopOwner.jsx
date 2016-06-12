import React, { PropTypes, Component } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { messages } from './FormRequestCreateShopOwner.i18n';
import { buttons } from 'app/shared/buttons';
import Dropzone from 'react-dropzone';

class FormRequestCreateShopOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };

    this.onDrop = (files) => {
      this.setState({
        files: files
      });
    }
  }

  render() {
    const {
      fields: { phone, identityNumber },
      handleSubmit
    } = this.props;

    const { formatMessage } = this.props.intl;

    return (
      <form onSubmit={handleSubmit}>
        <h4 className="page-header">Thông tin chủ shop</h4>
        <div className={`form-group ${phone.touched && phone.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.phone.label} />
          </label>
          <input type="text"
                 className="form-control"
                 placeholder={formatMessage(messages.phone.placeholder)}
            {...phone} />
          <div className="help-block">
            {phone.touched ? phone.error : ''}
          </div>
        </div>

        <div className={`form-group ${identityNumber.touched && identityNumber.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            <FormattedMessage {...messages.identityNumber.label} />
          </label>
          <input type="text"
                 className="form-control"
                 placeholder={formatMessage(messages.identityNumber.placeholder)}
            {...identityNumber} />
          <div className="help-block">
            {identityNumber.touched ? identityNumber.error : ''}
          </div>
        </div>
        <div className="form-group">
          <label>
            <FormattedMessage {...messages.verificationPhoto.label} />
          </label>
          <Dropzone
            onDrop={this.onDrop}
            className="dropzone"
            activeStyle={{borderColor: 'red'}}
            multiple={false}
            accept="image/*">
            <div>
              {this.state.files.length == 0 && <div>
                <h4>
                  <FormattedMessage {...messages.verificationPhoto.fileSelect} />
                </h4>
                <br />
                <FormattedMessage {...messages.verificationPhoto.note} />
                <ul>
                  <li>
                    <FormattedMessage {...messages.verificationPhoto.note1} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.verificationPhoto.note2} />
                  </li>
                </ul>
              </div>}
              {this.state.files.length > 0 && <img className="img-responsive" src={this.state.files[0].preview}/>}
            </div>
          </Dropzone>
        </div>
        <div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              <FormattedMessage {...buttons.next} /> <i className="fa fa-chevron-right"/>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

FormRequestCreateShopOwner.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default injectIntl(FormRequestCreateShopOwner);
