import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

import * as actionTypes from './actionTypes';
import {NEWS_DEFAULT_TEXT, NEWS_UNKNOWN} from '../../lib/constants';

let serverUrl = Config.STARTER_KIT_SERVER_URL;
if (serverUrl.endsWith('/')) {
  serverUrl = serverUrl.slice(0, -1);
}

const uniqueid = DeviceInfo.getUniqueId();

export const fetchNews = (sessionId, newsText) => {
  return async dispatch => {
    try {
      dispatch(fetchNewsStart());
      const response = await axios.post(`${serverUrl}/api/news_1`, {
        sessionid: sessionId,
        text: newsText,
      });
      const newsStr =
        response.data &&
        response.data[0] &&
        response.data[0].text.replace(NEWS_DEFAULT_TEXT, '');

      if (newsStr.trim() === NEWS_UNKNOWN) {
        dispatch(fetchNews(sessionId, newsText));
      } else {
        dispatch(fetchNewsSuccess(newsStr.trim()));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchNewsError());
    }
  };
};

const fetchNewsSuccess = newsData => {
  return {
    type: actionTypes.FETCH_NEWS_SUCCESS,
    payload: newsData,
  };
};

const fetchNewsStart = () => {
  return {
    type: actionTypes.FETCH_NEWS_START,
  };
};

const fetchNewsError = () => {
  return {
    type: actionTypes.FETCH_NEWS_START,
  };
};
