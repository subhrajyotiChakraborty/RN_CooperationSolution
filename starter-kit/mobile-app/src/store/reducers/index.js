import {combineReducers} from 'redux';

import user from './userReducer';
import splashLoader from './splashLoaderReducer';
import news from './newsReducer';
import emergencyServices from './emergencyReducer';

const rootReducer = combineReducers({
  user,
  splashLoader,
  news,
  services: emergencyServices,
});

export default rootReducer;
