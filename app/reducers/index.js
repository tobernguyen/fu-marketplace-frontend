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
import { feed } from './feed';
import { order } from './order';
import { notification } from './notification';
import { statistic } from './statistic';

const rootReducer = combineReducers({
  auth,
  user,
  shop,
  item,
  order,
  admin,
  feed,
  notification,
  statistic,
  routing,
  language,
  common,
  form: formReducer
});

export default rootReducer
