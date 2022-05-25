// External Dependencies
import axios from 'axios';

// Internal Import
import * as TYPES from '../types';
import { BACKEND_API_URL } from '../../constants/index';

import { logOutUser, loadMe } from './authActions';

const API_URL = BACKEND_API_URL;

export const editUser = (id, formData, history) => async (dispatch, getState) => {
  dispatch({
    type: TYPES.EDIT_USER_LOADING
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`${API_URL}/users/${id}`, formData, options);

    dispatch({
      type: TYPES.EDIT_USER_SUCCESS,
      payload: { user: response.data.user }
    });
    // edited him self, reload me
    if (getState().auth.me?.id === response.data.user.id) dispatch(loadMe());
    history.push(`/${response.data.user.username}`);
  } catch (err) {
    dispatch({
      type: TYPES.EDIT_USER_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

export const changePassword = formData => async (dispatch, getState) => {
  dispatch({
    type: TYPES.CHANGE_PASSWORD_LOADING
  });

  try {
    const options = attachTokenToHeaders(getState);
    const data = {
      oldpassword: formData.oldPassword,
      newpassword: formData.newPassword,
      confirmnewpassword: formData.confirmNewPassword
    };
    const response = await axios.put(`${API_URL}/users/change-password`, data, options);

    dispatch({
      type: TYPES.CHANGE_PASSWORD_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: TYPES.CHANGE_PASSWORD_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

// export const getProfile = (username, history) => async (dispatch, getState) => {
//   dispatch({
//     type: TYPES.GET_PROFILE_LOADING
//   });
//   try {
//     const options = attachTokenToHeaders(getState);
//     const response = await axios.get(`${API_URL}/api/v1/users/${username}`, options);

//     dispatch({
//       type: TYPES.GET_PROFILE_SUCCESS,
//       payload: { profile: response.data.user }
//     });
//   } catch (err) {
//     if (err?.response.status === 404) {
//       history.push('/notfound');
//     }
//     dispatch({
//       type: TYPES.GET_PROFILE_FAIL,
//       payload: { error: err?.response?.data.message || err.message }
//     });
//   }
// };

// export const deleteUser = (id, history) => async (dispatch, getState) => {
//   dispatch({
//     type: TYPES.DELETE_USER_LOADING,
//     payload: { id }
//   });
//   try {
//     const options = attachTokenToHeaders(getState);
//     const response = await axios.delete(`${API_URL}/api/v1/users/${id}`, options);

//     //logout only if he deleted himself
//     if (getState().auth.me.id === response.data.user.id) {
//       dispatch(logOutUser(id, history));
//     }
//     history.push('/users');
//     dispatch({
//       type: TYPES.DELETE_USER_SUCCESS,
//       payload: { message: response.data.user }
//     });
//   } catch (err) {
//     dispatch({
//       type: TYPES.DELETE_USER_FAIL,
//       payload: { error: err?.response?.data.message || err.message }
//     });
//   }
// };

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
