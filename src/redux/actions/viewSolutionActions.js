import axios from 'axios';

//internal import
import * as TYPES from '../types';
import { BACKEND_API_URL } from '../../constants';

const API_URL = BACKEND_API_URL;

export const viewSolution = solutionId => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });

    const response = await axios.get(`${API_URL}/solution/${solutionId}`);

    dispatch({
      type: TYPES.VIEW_SOLUTION_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: TYPES.VIEW_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message
      }
    });
  }
};

export const upVoteSolution = solutionId => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/solution/upvote/${solutionId}`, {}, options);

    dispatch({
      type: TYPES.UPVOTE_SOLUTION_SUCCESS,
      payload: {
        updatedSolution: response.data.updatedPost
      }
    });
  } catch (err) {
    dispatch({
      type: TYPES.UPVOTE_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message
      }
    });
  }
};

export const downVoteSolution = solutionId => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });
    const response = await axios.post(`${API_URL}/solution/downvote/${solutionId}`, {}, options);

    dispatch({
      type: TYPES.DOWNVOTE_SOLUTION_SUCCESS,
      payload: {
        updatedSolution: response.data.updatedPost
      }
    });
  } catch (err) {
    dispatch({
      type: TYPES.DOWNVOTE_SOLUTION_FAIL,
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
