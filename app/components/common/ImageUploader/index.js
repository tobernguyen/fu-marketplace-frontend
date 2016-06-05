import React, { Component, PropTypes } from 'react';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.handleFile = (e) => {
      const reader = new FileReader();
      var file = e.target.files[0];

      if (!file) {
        return;
      }

      reader.onload = (image) => {
        this.refs.in.value = '';
        this.props.handleFileChange(image.target.result);
      };

      reader.readAsDataURL(file);
    }
  }
  render() {
    return (
      <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
    );
  }
}

ImageUploader.propTypes = {
  handleFileChange: PropTypes.func.isRequired
};
