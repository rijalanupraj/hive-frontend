import axios from 'axios';

import {
    POST_SOLUTION_REQUEST,
    POST_SOLUTION_SUCCESS,
    POST_SOLUTION_FAIL,
} from '../types';

const API_URL = 'http://localhost:8000/api/v1';

export const postSolution = (questionId) => async (dispatch, getState) => {
  dispatch({ type: POST_SOLUTION_REQUEST });
  try {
    await axios.post(`${API_URL}/solution/&${questionId}`);
    dispatch({
      type: POST_SOLUTION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: POST_SOLUTION_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};