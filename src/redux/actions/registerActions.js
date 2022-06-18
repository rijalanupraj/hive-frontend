// External Import
import axios from 'axios';

// Internal Import
import * as TYPES from '../types';
import { BACKEND_API_URL } from '../../constants';

const API_URL = BACKEND_API_URL;

export const registerUserWithEmail = (formData, navigate) => async (dispatch, getState) => {
  dispatch({ type: TYPES.REGISTER_WITH_EMAIL_LOADING });
  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData);

    dispatch({
      type: TYPES.REGISTER_WITH_EMAIL_SUCCESS,
      payload: {
        message: response.data.message
      }
    });
    navigate('/login');
  } catch (err) {
    dispatch({
      type: TYPES.REGISTER_WITH_EMAIL_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

export const resetEmailSuccess = () => dispatch => {
  dispatch({
    type: TYPES.RESET_EMAIL_SUCCESS_MESSAGE
  });
};
