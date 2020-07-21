import {combineReducers} from 'redux';

import user from './userReducer';
import splashLoader from './splashLoaderReducer';
import news from './newsReducer';

const rootReducer = combineReducers({
  user,
  splashLoader,
  news,
});

export default rootReducer;
