import React, { Component, PropTypes } from 'react';
import BlockStars from '../BlockStars';

const MAX_LENGTH_COMMENT = 150;
const DEFAULT_RATING_STAR = 0;
const BACKSPACE_KEY_CODE = 8;
const DELETE_KEY_CODE = 46;
const INITIAL_STAR_NUMBER = 0;
export default class FormShopReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      stars: DEFAULT_RATING_STAR,
      maxLength: MAX_LENGTH_COMMENT
    };

    this.commentChanged = (e) => {
      const value = e.target.value;

      if (this.state.keyCode) {
        if (value.length > MAX_LENGTH_COMMENT
          && this.state.keyCode !== BACKSPACE_KEY_CODE
          && this.state.keyCode !== DELETE_KEY_CODE) {
          return;
        }
      }

      this.setState({
        comment: value,
        maxLength: MAX_LENGTH_COMMENT - value.length
      });
    };

    this.handleOnKeyDown = (e) => {
      this.setState({
        keyCode: e.keyCode
      })
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      if (this.state.stars > INITIAL_STAR_NUMBER) {
        const { stars, comment } = this.state;
        this.props.handleSubmitReview(stars, comment);
      }
    };

    this.handleOnStarClick = (nextValue, prevValue) => {
      if (nextValue !== prevValue) {
        this.setState({
          stars: nextValue
        })
      }
    }
  }
  render() {
    return (
      <div className="review-box clearfix">
        <label className="col-sm-2 user-avatar" htmlFor="input-review">
          <img src={this.props.reviewer.avatar} className="img-circle img-responsive"/>
        </label>
        <form onSubmit={this.handleSubmit}>
          <div className="col-sm-8 comment-box">
            <textarea
              id="input-review"
              value={this.state.comment}
              onChange={this.commentChanged}
              onKeyDown={this.handleOnKeyDown}
              className="form-control input-review"
              placeholder="Review (optional)"/>
            <BlockStars
              name={'user_review'}
              onStarClick={this.handleOnStarClick}
              value={this.props.stars} />
            <span className="pull-right">
            {this.state.maxLength} characters left
          </span>
          </div>
          <div className="col-sm-2 submit-btn">
            <button
              type="submit"
              disabled={this.state.stars === INITIAL_STAR_NUMBER}
              className="btn btn-primary">
              OK
            </button>
          </div>
        </form>
      </div>
    )
  }
}

FormShopReview.propTypes = {
  reviewer: PropTypes.object.isRequired,
  handleSubmitReview: PropTypes.func.isRequired
};
