import * as ItemActionTypes from '../actions/item';
import _ from 'lodash';

const INITIAL_STATE = {
  categories: []
};

export const item = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch (type) {
    case ItemActionTypes.GET_ITEM_CATEGORIES_SUCCESS:
      return _.merge({}, state, response);
    default:
      return state;
  }
};
