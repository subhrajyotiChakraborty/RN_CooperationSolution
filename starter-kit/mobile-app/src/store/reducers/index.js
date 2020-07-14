import {combineReducers} from 'redux';

import user from './userReducer';
import splashLoader from './splashLoaderReducer';

const rootReducer = combineReducers({
  user,
  splashLoader,
});

export default rootReducer;
