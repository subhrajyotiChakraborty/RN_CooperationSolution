import axios from 'axios';
import Config from 'react-native-config';

import * as actionTypes from './actionTypes';

let serverUrl = Config.STARTER_KIT_SERVER_URL;
if (serverUrl.endsWith('/')) {
  serverUrl = serverUrl.slice(0, -1);
}

export const fetchEmergencyServices = serviceName => {
  return async dispatch => {
    try {
      dispatch(fetchEmergencyServicesStart());
      const response = await axios.post(`${serverUrl}/api/services`, {
        category: serviceName,
      });
      console.log(response.data);
      dispatch(fetchEmergencyServicesSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchEmergencyServicesError());
    }
  };
};

export const fetchEmergencyServicesStart = () => {
  return {
    type: actionTypes.FETCH_PROVIDER_START,
  };
};

export const fetchEmergencyServicesSuccess = response => {
  return {
    type: actionTypes.FETCH_PROVIDER_SUCCESS,
    payload: response,
  };
};

export const fetchEmergencyServicesError = response => {
  return {
    type: actionTypes.FETCH_PROVIDER_FAIL,
  };
};
