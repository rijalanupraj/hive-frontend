import axios from "axios";

import { attachTokenToHeaders } from "./authActions";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants/index";

const API_URL = BACKEND_API_URL;

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: TYPES.GET_USERS_LOADING
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/users`, options);

    dispatch({
      type: TYPES.GET_USERS_SUCCESS,
      payload: { users: response.data.users }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_USERS_FAIL,
      payload: err.message
    });
  }
};

export const getTopUsers = () => async (dispatch, getState) => {
  dispatch({
    type: TYPES.GET_TOP_USERS_LOADING
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/users/topusers`, options);

    dispatch({
      type: TYPES.GET_TOP_USERS_SUCCESS,
      payload: { topUsers: response.data.users }
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_TOP_USERS_FAIL,
      payload: {
        error: err?.response?.data.message || err.message
      }
    });
  }
};
