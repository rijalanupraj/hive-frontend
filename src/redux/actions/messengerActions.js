// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getFriends = () => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/messenger/get-friends`, options);
    dispatch({
      type: TYPES.FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = data => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/messenger/send-message`, data, options);
    dispatch({
      type: TYPES.MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = id => {
  return async (dispatch, getState) => {
    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.get(`${API_URL}/messenger/get-message/${id}`, options);
      dispatch({
        type: TYPES.MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const ImageMessageSend = data => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/messenger/image-message-send`, data, options);
    dispatch({
      type: TYPES.MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const seenMessage = msg => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/messenger/seen-message`, msg, options);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = msg => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(`${API_URL}/messenger/delivared-message`, msg, options);

    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const getTheme = () => async dispatch => {
  const theme = localStorage.getItem("theme");
  dispatch({
    type: "THEME_GET_SUCCESS",
    payload: {
      theme: theme ? theme : "white"
    }
  });
};

export const themeSet = theme => async dispatch => {
  localStorage.setItem("theme", theme);
  dispatch({
    type: "THEME_SET_SUCCESS",
    payload: {
      theme: theme
    }
  });
};

export const attachTokenToHeaders = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
