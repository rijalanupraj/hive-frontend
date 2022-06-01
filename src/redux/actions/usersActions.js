import axios from "axios";

import { attachTokenToHeaders } from "./authActions";
import * as TYPES from "../types";

const API_URL = "http://localhost:8000";

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: TYPES.GET_USERS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/api/v1/users`, options);

    dispatch({
      type: TYPES.GET_USERS_SUCCESS,
      payload: { users: response.data.users },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_USERS_FAIL,
      payload: err.message,
    });
  }
};

export const followUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: TYPES.FOLLOW_USER_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      `${API_URL}/api/v1/users/follow-unfollow/${id}`,
      {},
      options
    );

    dispatch({
      type: TYPES.FOLLOW_USER_SUCCESS,
      payload: { users: response.data.users },
    });
  } catch (err) {
    dispatch({
      type: TYPES.FOLLOW_USER_FAIL,
      payload: err.message,
    });
  }
};

// export const unfollowUser = (username) => async (dispatch, getState) => {
//   dispatch({
//     type: TYPES.UNFOLLOW_USER_LOADING,
//   });
//   try {
//     const options = attachTokenToHeaders(getState);
//     const response = await axios.post(
//       `${API_URL}/api/v1/users/${username}/unfollow`,
//       {},
//       options
//     );

//     dispatch({
//       type: TYPES.UNFOLLOW_USER_SUCCESS,
//       payload: { users: response.data.users },
//     });
//   } catch (err) {
//     dispatch({
//       type: TYPES.UNFOLLOW_USER_FAIL,
//       payload: err.message,
//     });
//   }
// };
