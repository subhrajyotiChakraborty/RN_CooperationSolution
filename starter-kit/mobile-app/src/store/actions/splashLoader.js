import * as actionTypes from './actionTypes';

export const splashLoader = () => {
  return dispatch => {
    dispatch(startSplashLoading());
    setTimeout(() => {
      dispatch(endSplashLoading());
    }, 1000);
  };
};

export const endSplashLoading = () => {
  return {
    type: actionTypes.APP_SPLASH_LOADING_END,
  };
};

export const startSplashLoading = () => {
  return {
    type: actionTypes.APP_SPLASH_LOADING_START,
  };
};
