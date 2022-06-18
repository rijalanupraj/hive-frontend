import axios from "axios";

//internal import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const viewSolution = (solutionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });

    const response = await axios.get(`${API_URL}/solution/${solutionId}`);

    dispatch({
      type: TYPES.VIEW_SOLUTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.VIEW_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message,
      },
    });
  }
};

export const upVoteSolution = (solutionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      `${API_URL}/solution/upvote/${solutionId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.UPVOTE_SOLUTION_SUCCESS,
      payload: {
        updatedSolution: response.data.updatedPost,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.UPVOTE_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message,
      },
    });
  }
};

export const downVoteSolution = (solutionId) => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });
    const response = await axios.post(
      `${API_URL}/solution/downvote/${solutionId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.DOWNVOTE_SOLUTION_SUCCESS,
      payload: {
        updatedSolution: response.data.updatedPost,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.DOWNVOTE_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message,
      },
    });
  }
};

export const addComment =
  (solutionId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.ADD_COMMENT_LOADING });
      const options = attachTokenToHeaders(getState);
      console.log("here");
      const response = await axios.post(
        `${API_URL}/comment/solution/${solutionId}`,
        comment,
        options
      );
      console.log("hi");
      dispatch({
        type: TYPES.ADD_COMMENT_SUCCESS,
        payload: {
          newComment: response.data.comment,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ADD_COMMENT_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
    }
  };

export const updateComment =
  (commentId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.UPDATE_COMMENT_LOADING });
      const options = attachTokenToHeaders(getState);
      const response = await axios.put(
        `${API_URL}/comment/${commentId}`,
        comment,
        options
      );
      dispatch({
        type: TYPES.UPDATE_COMMENT_SUCCESS,
        payload: {
          updatedComment: response.data.comment,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.UPDATE_COMMENT_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
    }
  };

export const deleteComment =
  (solutionId, commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.DELETE_COMMENT_LOADING });
      const options = attachTokenToHeaders(getState);
      const response = await axios.delete(
        `${API_URL}/comment/delete/${solutionId}/${commentId}`,
        options
      );
      dispatch({
        type: TYPES.DELETE_COMMENT_SUCCESS,
        payload: {
          commentId: commentId,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.DELETE_COMMENT_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
    }
  };

export const reportSolution =
  (solutionId, report) => async (dispatch, getState) => {
    dispatch({ type: TYPES.REPORT_SOLUTION_LOADING });
    const options = attachTokenToHeaders(getState);
    try {
      const response = await axios.post(
        `${API_URL}/report-solution/add/${solutionId}`,
        {},
        options,
        report
      );
      dispatch({
        type: TYPES.REPORT_SOLUTION_SUCCESS,
        payload: {
          newReport: response.data.report,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.REPORT_SOLUTION_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    }
  };

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
