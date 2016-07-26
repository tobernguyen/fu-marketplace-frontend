import React, { Component, PropTypes } from 'react';
import './BlockSwitchLanguage.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';

class BlockSwitchLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: {
        vi: 'Tiếng Việt',
        en: 'English'
      }
    };

    this.isChecked = (language) => {
      return language === this.props.language
    };
  }

  render() {
    return (
      <div className="block-switch-language">
        <h4 className="title">
          <FormattedMessage {...{ id: 'switchLanguage.title', defaultMessage: 'Choose website language'}}/>
        </h4>
        <div className="row">
          <div className="choose-language">
            <form className="form-language" role="form">
              {_.map(this.state.languages, (value, key) => {
                return (
                  <div key={key} className="radio radio-primary">
                    <input type="radio" name="language" id={key} onChange={() => this.props.handleLanguageChanged(key)} checked={this.isChecked(key)}/>
                    <label htmlFor={key}>
                      {value}
                    </label>
                  </div>
                )
              })}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

BlockSwitchLanguage.propTypes = {
  language: PropTypes.string.isRequired,
  handleLanguageChanged: PropTypes.func.isRequired
};

BlockSwitchLanguage.defaultProps = {
  language: 'vi'
};

export default BlockSwitchLanguage;
