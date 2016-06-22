import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import { auth } from './auth';
import { admin } from './admin';
import { user } from './user';
import { language } from './language';
import { common } from './common';
import { shop } from './shop';
import { item } from './item';

const rootReducer = combineReducers({
  auth,
  user,
  shop,
  item,
  admin,
  routing,
  language,
  common,
  form: formReducer
});

export default rootReducer
