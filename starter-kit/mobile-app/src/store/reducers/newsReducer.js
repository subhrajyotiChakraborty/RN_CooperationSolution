import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  news: [],
  loading: false,
  error: false,
  message: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_START:
      return {
        ...state,
        error: false,
        message: null,
        loading: true,
      };

    case actionTypes.FETCH_NEWS_FAIL:
      return {
        ...state,
        error: true,
        message: 'Some Error occurred',
        loading: false,
      };

    case actionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        error: false,
        message: null,
        loading: false,
        news: [...state.news, action.payload],
      };

    case actionTypes.RESET_NEWS_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
