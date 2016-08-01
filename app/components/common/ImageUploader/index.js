import React, { Component, PropTypes } from 'react';
import { IMAGE_TYPES } from 'app/shared/mimeTypes';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.handleFile = (e) => {
      const reader = new FileReader();
      var file = e.target.files[0];

      if (!file) {
        return;
      }

      if (IMAGE_TYPES.indexOf(file.type) === -1) {
        this.props.handleFileError();
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
  handleFileChange: PropTypes.func.isRequired,
  handleFileError: PropTypes.func.isRequired
};
