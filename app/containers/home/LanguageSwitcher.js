import React, { PropTypes, Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { changeLanguage } from '../../actions';

const supportedLanguages = [
  {
    id: 'lang.en',
    key: 'en',
    description: 'English',
    defaultMessage: 'English'
  },
  {
    id: 'lang.vi',
    key: 'vi',
    description: 'Vietnamese',
    defaultMessage: 'Vietnamese'
  }
];

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props);

    this.languageText = (lang) => {
      return <FormattedMessage {...lang} />;
    };
  }
  render() {
    const currentLanguage = find(supportedLanguages, { key: this.props.language });
    return (
      <NavDropdown id="language-menu" title={this.languageText(currentLanguage)}>
        {supportedLanguages.map(lang =>
          <MenuItem key={lang.id} onClick={this.props.changeLanguage(lang.key)}>
            {this.languageText(lang)}
          </MenuItem>
        )}
      </NavDropdown>
    );
  }
}

const mapStateToProps = (state) => {
  const { language } = state;
  return {
    language: language.language
  }
};

export default connect(mapStateToProps,{
  changeLanguage
})(LanguageSwitcher);
