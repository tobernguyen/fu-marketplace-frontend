import React, { Component, PropTypes } from 'react';
import './OptionItem.scss';

export default class OptionItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="option-item">
        <div>
          <input id={`checkbox-${item.id}`}
                 className="checkbox-custom"
                 checked={item.checked}
                 type="checkbox"
                 onChange={() => this.props.toggleItem(item.id)} />
            <label htmlFor={`checkbox-${item.id}`}
                   className="checkbox-custom-label">
              {item.name}
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
