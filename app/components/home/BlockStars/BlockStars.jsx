import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class BlockStars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  onChange(value) {
    const { editing } = this.props;
    if (!editing) {
      return;
    }

    this.setState({ value });
  }

  onStarClick(i, value, name) {
    const { onStarClick, editing } = this.props;
    if (!editing) {
      return;
    }
    onStarClick && onStarClick(i, value, name);
  }

  renderStars() {
    const { name, starCount, starColor, renderStarIcon } = this.props;
    const { value } = this.state;
    const starStyles = {
      float: 'right',
      color: '#E7E7E7'
    };
    const radioStyles = {
      display: 'none',
      position: 'absolute',
      marginLeft: -9999
    };

    // populate stars
    let starNodes = [];
    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starNodeInput = (
        <input
          key={`input_${id}`}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          id={id}
          value={i}
          checked={value === i}
          onChange={this.onChange.bind(this, i, name)}
        />
      );
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={value >= i ? {float: starStyles.float, color: starColor} : starStyles}
          className="dv-star-rating-star"
          htmlFor={id}
          onClick={this.onStarClick.bind(this, i, value, name)}
        >
          {typeof renderStarIcon === 'function' ? (
            renderStarIcon(i, value, name)
          ) : (
            <i className={`fa fa-star`}/>
          )}
        </label>
      );
      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return starNodes;
  }

  render() {
    const { editing, className } = this.props;
    const classes = cx('dv-star-rating', {
      'dv-star-rating-non-editable': !editing
    }, className);

    return (
      <div style={{display: 'inline-block', position: 'relative'}} className={classes}>
        {this.renderStars()}
      </div>
    );
  }
}

BlockStars.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  editing: PropTypes.bool,
  starCount: PropTypes.number,
  starColor: PropTypes.string,
  onStarClick: PropTypes.func,
  renderStarIcon: PropTypes.func
};

BlockStars.defaultProps = {
  starCount: 5,
  value: 0,
  editing: true,
  starColor: '#ffb400'
};

export default BlockStars;
