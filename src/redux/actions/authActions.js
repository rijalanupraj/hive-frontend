import axios from 'axios';

import {
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAIL,
  ME_LOADING,
  ME_SUCCESS,
  ME_FAIL
} from '../types';

const API_URL = 'http://localhost:8000/api/v1';

export const loadMe = () => async (dispatch, getState) => {
  dispatch({ type: ME_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/users/me`, options);

    dispatch({
      type: ME_SUCCESS,
      payload: { me: response.data.me }
    });
  } catch (err) {
    dispatch({
      type: ME_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const loginUserWithEmail = (formData, navigate) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_EMAIL_LOADING });
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData);

    dispatch({
      type: LOGIN_WITH_EMAIL_SUCCESS,
      payload: { token: response.data.token, me: response.data.me }
    });

    dispatch(loadMe());
    navigate('/');
  } catch (err) {
    dispatch({
      type: LOGIN_WITH_EMAIL_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

export const logInUserWithOauth = token => async (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_OAUTH_LOADING });

  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    };

    const response = await axios.get(`${API_URL}/users/me`, { headers });

    dispatch({
      type: LOGIN_WITH_OAUTH_SUCCESS,
      payload: { me: response.data.me, token }
    });
  } catch (err) {
    dispatch({
      type: LOGIN_WITH_OAUTH_FAIL,
      payload: { error: err.response.data.message }
    });
  }
};

// Log user out
export const logOutUser = navigate => async dispatch => {
  try {
    deleteAllCookies();
    //just to log user logut on the server
    // TODO: Implement This later on
    // await axios.get(`${API_URL}/auth/logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: { token:null, me:null }
    });
    console.log('logout success');
    if (navigate) navigate('/');
  } catch (error) {
    console.log(error);
  }
};

function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const attachTokenToHeaders = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
