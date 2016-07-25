import React, { Component, PropTypes } from 'react';
import './ModalHeader.scss';
import { Link } from 'react-router';

export default class ModalHeader extends Component {
  render() {
    let subHeader;
    if (typeof this.props.subHeader === 'string') {
      subHeader = <p className="sub-header">{this.props.subHeader}</p>;
    }
    const closeLink = this.props.closeLink || '/';
    return (
      <div className="modal-header">
        <Link to={{ pathname: closeLink, query: this.props.query || {} }} className="close"><span>×</span></Link>
        <h2 className="title">{this.props.title}</h2>
        {subHeader}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired
};
