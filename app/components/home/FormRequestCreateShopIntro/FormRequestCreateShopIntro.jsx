import React, { PropTypes, Component } from 'react';
import './FormRequestCreateShopIntro.scss';
import { messages } from './FormRequestCreateShopIntro.i18n';
import { FormattedMessage } from 'react-intl';


class FormRequestCreateShopIntro extends Component {
  render() {
    const { loaded, intro } = this.props;
    return (
      <div className="form-request-create-shop-intro">
        <div className="action-points">
          <div className="arrow"></div>
          <div className="circle orange">
            <h5>1<br/>
              <FormattedMessage {...messages.step1.title} />
            </h5>
            <p>
              <FormattedMessage {...messages.step1.description} />
            </p>
          </div>
          <div className="circle green">
            <h5>2<br/>
              <FormattedMessage {...messages.step2.title} />
            </h5>
            <p>
              <FormattedMessage {...messages.step2.description} />
            </p>
          </div>
          <div className="circle yellow">
            <h5>3<br/>
              <FormattedMessage {...messages.step3.title} />
            </h5>
            <p>
              <FormattedMessage {...messages.step3.description} />
            </p>
          </div>
        </div>
        {!intro && <button type="submit" disabled={!loaded} className="btn btn-primary" onClick={this.props.nextPage}>
          <FormattedMessage {...messages.registerNow} />{' '}
          {!loaded && <i className="fa fa-spinner fa-spin" />}
        </button>}
      </div>
    );
  }
}

FormRequestCreateShopIntro.propTypes = {
  loaded: PropTypes.bool,
  intro: PropTypes.bool
};

export default FormRequestCreateShopIntro;
