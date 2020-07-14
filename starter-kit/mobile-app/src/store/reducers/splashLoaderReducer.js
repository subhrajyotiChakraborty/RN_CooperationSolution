import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.APP_SPLASH_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.APP_SPLASH_LOADING_END:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
