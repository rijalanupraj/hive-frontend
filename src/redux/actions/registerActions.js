import axios from 'axios';

import {
  REGISTER_WITH_EMAIL_LOADING,
  REGISTER_WITH_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAIL
} from '../types';

const API_URL = 'http://localhost:8000';

export const registerUserWithEmail = (formData, navigate) => async (dispatch, getState) => {
  dispatch({ type: REGISTER_WITH_EMAIL_LOADING });
  try {
    await axios.post(`${API_URL}/auth/register`, formData);
    dispatch({
      type: REGISTER_WITH_EMAIL_SUCCESS
    });
    navigate('/login');
  } catch (err) {
    dispatch({
      type: REGISTER_WITH_EMAIL_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};
