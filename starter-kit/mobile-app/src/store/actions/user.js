import * as actionTypes from './actionTypes';

export const authUser = userData => {
  return async dispatch => {
    try {
      dispatch(authUserStart());
      setTimeout(() => {
        dispatch(
          authUserSuccess({
            name: 'Subha',
          }),
        );
      }, 2000);
    } catch (error) {
      dispatch(authUserFail(error));
      console.log(error);
    }
  };
};

export const authUserFail = error => {
  return {
    type: actionTypes.USER_AUTH_FAIL,
    payload: error,
  };
};

export const authUserStart = () => {
  return {
    type: actionTypes.USER_AUTH_START,
  };
};

export const authUserSuccess = userData => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    payload: userData,
  };
};
