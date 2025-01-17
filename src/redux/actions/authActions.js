// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const loadMe = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.ME_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/users/me`, options);

    dispatch({
      type: TYPES.ME_SUCCESS,
      payload: { me: response.data.me },
    });
  } catch (err) {
    dispatch({
      type: TYPES.ME_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const loginUserWithEmail =
  (formData, navigate, redirectTo) => async (dispatch, getState) => {
    dispatch({ type: TYPES.LOGIN_WITH_EMAIL_LOADING });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);

      dispatch({
        type: TYPES.LOGIN_WITH_EMAIL_SUCCESS,
        payload: { token: response.data.token, me: response.data.me },
      });

      dispatch(loadMe());
      navigate(redirectTo || "/", { replace: true });
    } catch (err) {
      dispatch({
        type: TYPES.LOGIN_WITH_EMAIL_FAIL,
        payload: { error: err.response.data.message },
      });
    }
  };

export const logInUserWithOauth = (token) => async (dispatch, getState) => {
  dispatch({ type: TYPES.LOGIN_WITH_OAUTH_LOADING });

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };

    const response = await axios.get(`${API_URL}/users/me`, { headers });

    dispatch({
      type: TYPES.LOGIN_WITH_OAUTH_SUCCESS,
      payload: { me: response.data.me, token },
    });
  } catch (err) {
    dispatch({
      type: TYPES.LOGIN_WITH_OAUTH_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const viewMyFollowings = (id) => async (dispatch, getState) => {
  dispatch({ type: TYPES.VIEW_MY_FOLLOWINGS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(
      `${API_URL}/users/viewfollowings/${id}`,
      options
    );

    dispatch({
      type: TYPES.VIEW_MY_FOLLOWINGS_SUCCESS,
      payload: { followings: response.data.followings },
    });
  } catch (err) {
    dispatch({
      type: TYPES.VIEW_MY_FOLLOWINGS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const toggleBookmark = (solutionId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.TOGGLE_BOOKMARK_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(
      `${API_URL}/bookmark/solution/${solutionId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.TOGGLE_BOOKMARK_SUCCESS,
      payload: { me: response.data.me },
    });
  } catch (err) {
    dispatch({
      type: TYPES.TOGGLE_BOOKMARK_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const toggleAnswerLater = (questionId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.TOGGLE_ANSWER_LATER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(
      `${API_URL}/users/answerLater/${questionId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.TOGGLE_ANSWER_LATER_SUCCESS,
      payload: { me: response.data.me },
    });
  } catch (err) {
    dispatch({
      type: TYPES.TOGGLE_ANSWER_LATER_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getMyFollowers = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_MY_FOLLOWERS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const currentState = getState();
    const response = await axios.get(
      `${API_URL}/users/viewfollowers/${currentState.auth.me._id}`,
      options
    );

    dispatch({
      type: TYPES.GET_MY_FOLLOWERS_SUCCESS,
      payload: { followers: response.data.followers },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_MY_FOLLOWERS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getMyFollowings = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_MY_FOLLOWINGS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const currentState = getState();
    const response = await axios.get(
      `${API_URL}/users/viewfollowings/${currentState.auth.me._id}`,
      options
    );

    dispatch({
      type: TYPES.GET_MY_FOLLOWINGS_SUCCESS,
      payload: { followings: response.data.followings },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_MY_FOLLOWINGS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getMyBookmarks = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_MY_BOOKMARKS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/bookmark`, options);

    dispatch({
      type: TYPES.GET_MY_BOOKMARKS_SUCCESS,
      payload: { bookmarks: response.data.solutions },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_MY_BOOKMARKS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getMyAnswerLater = () => async (dispatch, getState) => {
  dispatch({ type: TYPES.GET_MY_ANSWER_LATER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(
      `${API_URL}/users/allanswerlater`,
      options
    );

    dispatch({
      type: TYPES.GET_MY_ANSWER_LATER_SUCCESS,
      payload: { answerLater: response.data.questions },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_MY_ANSWER_LATER_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const chooseInterestedCategory =
  (category, enqueueSnackbar) => async (dispatch, getState) => {
    dispatch({
      type: TYPES.CHOOSE_INTERESTED_CATEGORY_LOADING,
    });
    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.post(
        `${API_URL}/users/interested-categories`,
        category,
        options
      );

      dispatch({
        type: TYPES.CHOOSE_INTERESTED_CATEGORY_SUCCESS,
        payload: { user: response.data.user },
      });
      enqueueSnackbar("Category updated successfully", {
        variant: "success",
      });
    } catch (err) {
      dispatch({
        type: TYPES.CHOOSE_INTERESTED_CATEGORY_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
      enqueueSnackbar("Error adding category", {
        variant: "error",
      });
    }
  };

export const getPersonalFeed =
  (pageNumber, filter) => async (dispatch, getState) => {
    dispatch({
      type: TYPES.GET_PERSONAL_FEED_LOADING,
    });
    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.get(
        `${API_URL}/solution/personal/feed?page=${pageNumber}&filter=${filter}`,
        options
      );

      dispatch({
        type: TYPES.GET_PERSONAL_FEED_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: TYPES.GET_PERSONAL_FEED_FAIL,
        payload: { error: err.response.data.message },
      });
    }
  };

export const getAllNotifications = () => async (dispatch, getState) => {
  dispatch({
    type: TYPES.GET_ALL_NOTIFICATIONS_LOADING,
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${API_URL}/notifications/`, options);

    dispatch({
      type: TYPES.GET_ALL_NOTIFICATIONS_SUCCESS,
      payload: { notifications: response.data.notifications },
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_NOTIFICATIONS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const markAllNotificationsAsRead = () => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(
      `${API_URL}/notifications/markallopened`,
      {},
      options
    );

    dispatch({
      type: TYPES.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
      payload: { notifications: response.data.notifications },
    });
  } catch (err) {
    console.log(err);
  }
};

// Log user out
export const logOutUser = (navigate) => async (dispatch) => {
  try {
    deleteAllCookies();
    //just to log user logut on the server
    // TODO: Implement This later on
    // await axios.get(`${API_URL}/auth/logout`);

    dispatch({
      type: TYPES.LOGOUT_SUCCESS,
      payload: { me: null, token: null },
    });
    if (navigate) navigate("/");
  } catch (error) {
    console.log(error);
  }
};

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const attachTokenToHeaders = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
