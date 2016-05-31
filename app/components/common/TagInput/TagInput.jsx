import React, { Component, PropTypes} from 'react';

import './TagInput.scss';

class TagInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tags: this.props.tags
    }
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  addTag(tag) {
    const temp = this.state.tags.filter(t => t == tag);
    if(temp.length === 0) {
      this.setState({
        tags: this.state.tags.concat(tag)
      }, () => this.props.updateTag(this.state.tags)
      ); //Add new tag to Tags
    }
  }

  removeTag(index) {
    const removedTag = this.state.tags[index];
    this.setState({
      tags: this.state.tags.filter(tag => tag !== removedTag)
    }, () => this.props.updateTag(this.state.tags));
  }

  onKeyPressed(e) {
    if(e.which === 13) { //Enter key is Pressed
      this.addTag(e.target.value);
      e.target.value = "";
    }
    if(e.which === 8) {
      if(e.target.value.length === 0 ) {
        const lastIndex = this.state.tags.length - 1;
        this.removeTag(lastIndex);
      }
    }
  }

  render() {
    return (
      <div className="tags-input form-control">
        {this.state.tags.map((tag, index) =>
          <span key={tag} className="tag">
            {tag}
            <span className="remove" onClick={() => this.removeTag(index)}>
              x
            </span>
          </span>
        )}
        <input
          type="text"
          placeholder=""
          onKeyDown={this.onKeyPressed}/>
      </div>
    );
  }
}

TagInput.propTypes = {
  tags: PropTypes.array,
  updateTag: PropTypes.func
};

export default TagInput;
