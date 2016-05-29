import React, { Component, PropTypes } from 'react';
import './ModalHeader.scss';

export default class ModalHeader extends Component {
  render() {
    var closeButton;
    if (typeof this.props.onClose === 'function' ) {
      closeButton = <button type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
    }
    var subHeader;
    if (typeof this.props.subHeader === 'string') {
      subHeader = <p className="sub-header">{this.props.subHeader}</p>;
    }
    return (
      <div className="modal-header">
        {closeButton}
        <h2 className="title">{this.props.title}</h2>
        {subHeader}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired
};
