// External Import
import axios from 'axios';

// Internal Import
import * as TYPES from '../types';
import { BACKEND_API_URL } from '../../constants';

const API_URL = BACKEND_API_URL;

export const postSolution = (questionId, jsonData, navigate) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.POST_SOLUTION_REQUEST });

    const options = attachTokenToHeaders(getState);

    const response = await axios.post(`${API_URL}/solution/${questionId}`, jsonData, options);

    dispatch({
      type: TYPES.POST_SOLUTION_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: TYPES.POST_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message
      }
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
