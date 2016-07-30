import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockSwitchLanguage from 'app/components/home/BlockSwitchLanguage';
import { connect } from 'react-redux';
import { updateModalSize, saveLanguageChange } from 'app/actions/common';
import { BOOTSTRAP_MODAL_SIZE } from 'app/shared/sizes';
import { withRouter } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { buttons } from 'app/shared/buttons';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'vi'
    };

    this.handleLanguageChanged = (language) => {
      this.setState({
        language: language
      })
    };

    this.saveLanguageChange = (e) => {
      e.preventDefault();
      this.props.saveLanguageChange(this.state.language);
      this.props.router.push('/');
      window.location.reload();
    };

    this.closeModal = (e) => {
      e.preventDefault();
      this.props.router.push({
        pathname: '/',
        query: this.props.query
      })
    }
  }

  componentWillMount() {
    this.props.updateModalSize(BOOTSTRAP_MODAL_SIZE.SMALL);
    const currentLanguage = window.localStorage.getItem('language');
    if (currentLanguage) {
      this.setState({
        language: currentLanguage
      })
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className="settings">
        <ModalHeader query={this.props.query} title={formatMessage({ id: 'page.settings', defaultMessage: 'Settings' })}/>
        <div className="modal-body">
          <BlockSwitchLanguage handleLanguageChanged={this.handleLanguageChanged} language={this.state.language} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-default" onClick={this.closeModal}>
            <FormattedMessage {...buttons.cancel} />
          </button>
          <button className="btn btn-primary" onClick={this.saveLanguageChange}>
            <FormattedMessage {...buttons.save} />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.common.query
  }
};

export default withRouter(injectIntl(connect(mapStateToProps, {
  updateModalSize,
  saveLanguageChange
})(Settings)))
