import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './ImageLoader.scss';

export default class ImageLoader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false,
      parentWidth: 0
    };

    this.handleOnLoad = () => {
      this.setState({
        imageLoaded: true
      })
    };
  }

  componentDidMount() {
    this.setState({
      parentWidth: this.refs.image.parentNode.offsetWidth
    })
  }

  render() {
    const { imageSource } = this.props;
    const parentSize = this.state.parentWidth;
    const { imageLoaded } = this.state;

    return (
      <div
        ref="image"
        style={{'height': parentSize}}
        className={classNames(
          'image-loader',
          {
            'is-loading': !imageLoaded
          },
          {
            'is-visible': imageLoaded
          })}>
        {!imageLoaded && <i className="fa fa-spin fa-circle-o-notch"/>}
        <img src={imageSource} onLoad={this.handleOnLoad} />
      </div>
    )
  }
}

ImageLoader.propTypes = {
  imageSource: PropTypes.string
};
