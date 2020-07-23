import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  services: [],
  loading: false,
  error: false,
  message: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROVIDER_START:
      return {
        ...state,
        error: false,
        message: null,
        loading: true,
      };

    case actionTypes.FETCH_PROVIDER_FAIL:
      return {
        ...state,
        error: true,
        message: 'Some Error occurred',
        loading: false,
      };

    case actionTypes.FETCH_PROVIDER_SUCCESS:
      return {
        ...state,
        error: false,
        message: null,
        loading: false,
        services: [...action.payload],
      };

    case actionTypes.RESET_PROVIDER_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
