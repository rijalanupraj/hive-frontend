// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getFriends = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.MESSENGER_GET_FRIENDS_LOADING });

    const options = attachTokenToHeaders(getState);

    const { data } = await axios.get(`${API_URL}/messenger/get-friends`, options);
    dispatch({
      type: TYPES.MESSENGER_GET_FRIENDS_SUCCESS,
      payload: {
        friends: data.friends
      }
    });
  } catch (err) {
    dispatch({
      type: TYPES.MESSENGER_GET_FRIENDS_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

export const sendMessage = messageData => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.MESSENGER_SEND_MESSAGE_LOADING });

    const options = attachTokenToHeaders(getState);

    const { data } = await axios.post(`${API_URL}/messenger/send-message`, messageData, options);
    dispatch({
      type: TYPES.MESSENGER_SEND_MESSAGE_SUCCESS,
      payload: {
        message: data.message
      }
    });
  } catch (err) {
    dispatch({
      type: TYPES.MESSENGER_SEND_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

export const getMessages = id => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.MESSENGER_GET_MESSAGES_LOADING });

    const options = attachTokenToHeaders(getState);

    const { data } = await axios.get(`${API_URL}/messenger/get-messages/${id}`, options);
    dispatch({
      type: TYPES.MESSENGER_GET_MESSAGES_SUCCESS,
      payload: {
        message: data.message
      }
    });
  } catch (err) {
    dispatch({
      type: TYPES.MESSENGER_GET_MESSAGES_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

export const sendImageMessage = messageData => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.MESSENGER_SEND_MESSAGE_LOADING });

    const options = attachTokenToHeaders(getState);

    const { data } = await axios.post(
      `${API_URL}/messenger/send-image-message`,
      messageData,
      options
    );

    dispatch({
      type: TYPES.MESSENGER_SEND_MESSAGE_SUCCESS,
      payload: {
        message: data.message
      }
    });
    console.log(data);
  } catch (err) {
    dispatch({
      type: TYPES.MESSENGER_SEND_MESSAGE_FAIL,
      payload: { error: err?.response?.data.message || err.message }
    });
  }
};

export const seenMessage = messageData => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);

    const { data } = await axios.post(`${API_URL}/messenger/seen-message`, messageData, options);
  } catch (err) {
    console.log(err);
  }
};

export const updateMessage = messageData => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);

    const { data } = await axios.post(
      `${API_URL}/messenger/delivered-message`,
      messageData,
      options
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
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
