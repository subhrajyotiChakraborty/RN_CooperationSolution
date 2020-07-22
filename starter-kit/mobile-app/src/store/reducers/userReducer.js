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
        message: 'Some Error occurred',
        loading: false,
      };

    case actionTypes.USER_AUTH_SUCCESS:
      return {
        ...state,
        error: false,
        message: null,
        loading: false,
        isLoggedIn: true,
      };

    case actionTypes.USER_GEO_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
