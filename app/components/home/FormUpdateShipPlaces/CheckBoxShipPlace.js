import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class CheckBoxShipPlace extends Component {
  constructor(props) {
    super(props);
    this.handleToggleShipPlace = (e) => {
      e.preventDefault();

      this.props.toggleShipPlace(this.props.place);
    }
  }
  render() {
    const { place } = this.props;
    return (
      <button className={classNames('checkbox-ship-place btn', { 'btn-danger': place.checked })} onClick={this.handleToggleShipPlace}>
        {place.name}
      </button>
    )
  }
}
