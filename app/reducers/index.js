import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import { auth } from './auth';
import { admin } from './admin';
import { user } from './user';

const rootReducer = combineReducers({
  auth,
  user,
  admin,
  routing,
  form: formReducer
});

export default rootReducer
