import React, { Component, PropTypes } from 'react';
import './OptionItem.scss';

export default class OptionItem extends Component {
  render() {
    const { item, noLabel } = this.props;
    return (
      <div className="option-item">
        <div>
          <input id={`checkbox-${item.id}`}
                 className="checkbox-custom"
                 checked={item.checked}
                 type="checkbox"
                 onChange={() => this.props.toggleItem(item)} />

          <label htmlFor={`checkbox-${item.id}`}
                   className="checkbox-custom-label">
            {noLabel ? '' : item.name}
            </label>
        </div>
      </div>
    );
  }
}

OptionItem.propTypes = {
  item: PropTypes.object.isRequired,
  toggleItem: PropTypes.func.isRequired
};
