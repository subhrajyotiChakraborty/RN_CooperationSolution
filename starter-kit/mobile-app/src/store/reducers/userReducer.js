import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  role: '',
  address: '',
  phone: '',
  email: '',
  isLoggedIn: false,
  loading: false,
  error: false,
  message: null,
  location: '',

  // dev purpose
  // name: 'James Rodrigez',
  // role: 'Technical Person',
  // address: 'Madrid, Spain',
  // phone: '1739023899',
  // email: 'james@ss.com',
  // isLoggedIn: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_START:
      return {
        ...state,
        error: false,
        message: null,
        loading: true,
      };

    case actionTypes.USER_AUTH_FAIL:
      return {
        ...state,
        error: true,
        message: 'Some Error occurred, Please try again.',
        loading: false,
      };

    case actionTypes.USER_AUTH_SUCCESS:
      return {
        ...state,
        error: false,
        message: null,
        loading: false,
        isLoggedIn: true,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        location: action.payload.location,
        address: action.payload.address,
        role: action.payload.role,
      };

    case actionTypes.USER_GEO_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case actionTypes.USER_AUTH_LOGOUT:
      return INITIAL_STATE;

    case actionTypes.USER_AUTH_RESET_ERROR_STATE:
      return {
        ...state,
        error: false,
        message: null,
      };

    default:
      return state;
  }
};

export default reducer;
