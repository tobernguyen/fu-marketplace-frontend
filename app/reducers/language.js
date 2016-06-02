import * as ActionTypes from '../actions';
import _ from 'lodash';
import { languageKey } from 'app/config';

const INITIAL_STATE = {
  language: localStorage.getItem(languageKey) || 'en'
};
export const language = (state = INITIAL_STATE, action) => {
  return (action.type === ActionTypes.CHANGE_LANGUAGE) ? _.assign({}, state, {
    language: action.language
  }) : state;
};
