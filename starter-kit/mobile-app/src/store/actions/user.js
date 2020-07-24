import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';

import * as actionTypes from './actionTypes';

let serverUrl = Config.STARTER_KIT_SERVER_URL;
if (serverUrl.endsWith('/')) {
  serverUrl = serverUrl.slice(0, -1);
}

const uniqueid = DeviceInfo.getUniqueId();

export const authUser = userData => {
  return async dispatch => {
    try {
      dispatch(authUserStart());
      // setTimeout(() => {
      //   dispatch(
      //     authUserSuccess({
      //       name: 'Subha',
      //     }),
      //   );
      // }, 2000);
      const response = await axios.post(`${serverUrl}/api/login`, {
        ...userData,
      });
      // console.log(response.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      dispatch(authUserSuccess(response.data));
    } catch (error) {
      dispatch(authUserFail(error));
      console.log(error);
    }
  };
};

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(authUserStart());
      const response = await axios.post(`${serverUrl}/api/register`, {
        ...userData,
        mobileID: uniqueid,
      });
      // console.log(response.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      dispatch(authUserSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(authUserFail(error));
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

export const getUserLocation = () => {
  return dispatch => {
    Geolocation.getCurrentPosition(pos => {
      dispatch(
        saveUserLocation(`${pos.coords.latitude},${pos.coords.longitude}`),
      );
    });
  };
};

export const saveUserLocation = locationStr => {
  return {
    type: actionTypes.USER_GEO_LOCATION,
    payload: locationStr,
  };
};

export const updateUserLocation = locationStr => {
  return {
    type: actionTypes.USER_GEO_LOCATION,
    payload: locationStr,
  };
};

export const clearUserData = () => {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('userData');
      dispatch(logout());
    } catch (error) {
      console.log('Error during clear userData');
    }
  };
};

export const logout = () => {
  return {
    type: actionTypes.USER_AUTH_LOGOUT,
  };
};

export const resetErrorState = () => {
  return {
    type: actionTypes.USER_AUTH_RESET_ERROR_STATE,
  };
};

export const checkLoginStatus = () => {
  return async dispatch => {
    try {
      dispatch(authUserStart());
      const user = await AsyncStorage.getItem('userData');
      console.log(user);
      if (user !== null) {
        dispatch(authUserSuccess(JSON.parse(user)));
      } else {
        dispatch(resetErrorState());
      }
    } catch (error) {
      dispatch(authUserFail(error));
    }
  };
};
