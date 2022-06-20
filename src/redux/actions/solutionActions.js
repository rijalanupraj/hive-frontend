// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const postSolution =
  (questionId, jsonData, navigate, enqueueSnackbar) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.POST_SOLUTION_REQUEST });

      const options = attachTokenToHeaders(getState);

      const response = await axios.post(
        `${API_URL}/solution/${questionId}`,
        jsonData,
        options
      );

      dispatch({
        type: TYPES.POST_SOLUTION_SUCCESS,
      });
      navigate(`/solution/${response.data.answer._id}`);
      enqueueSnackbar("Solution posted successfully", {
        variant: "success",
      });
    } catch (err) {
      dispatch({
        type: TYPES.POST_SOLUTION_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
      enqueueSnackbar("Error posting solution", {
        variant: "error",
      });
    }
  };

export const updateSolution =
  (solutionId, jsonData, navigate, enqueueSnackbar) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.UPDATE_SOLUTION_REQUEST });

      const options = attachTokenToHeaders(getState);
      const response = await axios.put(
        `${API_URL}/solution/updatesolution/${solutionId}`,
        jsonData,
        options
      );
      dispatch({
        type: TYPES.UPDATE_SOLUTION_SUCCESS,
      });
      if (navigate) {
        navigate(`/solution/${solutionId}`);
      }
      if (enqueueSnackbar) {
        enqueueSnackbar("Solution updated successfully", {
          variant: "success",
        });
      }
    } catch (err) {
      dispatch({
        type: TYPES.UPDATE_SOLUTION_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
      if (enqueueSnackbar) {
        enqueueSnackbar("Error updating solution", {
          variant: "error",
        });
      }
    }
  };

export const deleteSolution =
  (solutionId, navigate) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.DELETE_SOLUTION_REQUEST });

      const options = attachTokenToHeaders(getState);

      await axios.delete(
        `${API_URL}/solution/deletesolution/${solutionId}`,
        options
      );

      dispatch({
        type: TYPES.DELETE_SOLUTION_SUCCESS,
      });
      if (navigate) {
        navigate("/");
      }
    } catch (err) {
      dispatch({
        type: TYPES.DELETE_SOLUTION_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
    }
  };

export const upVoteAnySolution = (solutionId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.UPVOTE_SOLUTION_ANY_LOADING });
  const options = attachTokenToHeaders(getState);
  try {
    const response = await axios.post(
      `${API_URL}/solution/upvote/${solutionId}`,
      {},
      options
    );
    dispatch({
      type: TYPES.UPVOTE_SOLUTION_ANY_SUCCESS,
      payload: { solutionId, upVote: response.data.upVote },
    });
  } catch (err) {
    dispatch({
      type: TYPES.UPVOTE_SOLUTION_ANY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
export const downVoteAnySolution =
  (solutionId) => async (dispatch, getState) => {
    dispatch({ type: TYPES.DOWNVOTE_SOLUTION_ANY_LOADING });
    const options = attachTokenToHeaders(getState);
    try {
      const response = await axios.post(
        `${API_URL}/solution/downvote/${solutionId}`,
        {},
        options
      );
      dispatch({
        type: TYPES.DOWNVOTE_SOLUTION_ANY_SUCCESS,
        payload: { solutionId, downVote: response.data.downVote },
      });
    } catch (err) {
      dispatch({
        type: TYPES.DOWNVOTE_SOLUTION_ANY_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    }
  };

export const reportSolution =
  (id, reportData, enqueueSnackbar) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TYPES.REPORT_SOLUTION_LOADING,
      });
      const options = attachTokenToHeaders(getState);

      const response = await axios.post(
        `${API_URL}/report-solution/add/${id}`,
        reportData,
        options
      );

      dispatch({
        type: TYPES.REPORT_SOLUTION_SUCCESS,
        payload: {
          report: response.data.report,
        },
      });
      enqueueSnackbar("Reported solution successfully", {
        variant: "success",
      });
    } catch (err) {
      dispatch({
        type: TYPES.REPORT_SOLUTION_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
      enqueueSnackbar("Failed to report solution", {
        variant: "error",
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

//get all solution
export const getAllSolutionHome = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.GET_ALL_SOLUTIONS_LOADING });

    const response = await axios.get(`${API_URL}/solution`);

    dispatch({
      type: TYPES.GET_ALL_SOLUTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_SOLUTIONS_FAIL,
      payload: {
        error: err?.response?.data.message || err.message,
      },
    });
  }
};
