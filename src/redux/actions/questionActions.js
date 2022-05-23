// External Import
import axios from 'axios';

// Internal Import
import * as TYPES from '../types';
import { BACKEND_API_URL } from '../../constants';

const API_URL = BACKEND_API_URL;

export const askQuestion = (formData, navigate) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.ASK_QUESTION_LOADING });

    const options = attachTokenToHeaders(getState);

    const { data } = await axios.post(`${API_URL}/question`, formData, options);
    dispatch({ type: TYPES.ASK_QUESTION_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TYPES.ASK_QUESTION_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

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
