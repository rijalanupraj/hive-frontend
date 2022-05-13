import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants";

import axios from "axios";

// GET User Token from the local storage
const tokenConfig = () => {
  const token = localStorage.getItem("user-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

//login
export const userLogin = (emailOrUsername, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // const config = { headers: { "Content-Type":"application/json" } };
    // console.log(email, password);

    const { data } = await axios.post(`/api/v1/auth/login`, {
      emailOrUsername,
      password,
    });
    // console.log(email, password);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//register
export const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    // const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/auth/register`, userData);
    // console.log(data);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(
      `/api/v1/user/updateprofile`,
      userData,
      tokenConfig()
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProfileImage = (image) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const token = localStorage.getItem("user-token");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.put(
      `/api/v1/user/profilepicture`,
      image,
      config
    );

    dispatch({ type: UPDATE_PROFILE_PICTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
