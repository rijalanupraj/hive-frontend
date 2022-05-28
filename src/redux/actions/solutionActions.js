// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const postSolution =
  (questionId, jsonData, navigate) => async (dispatch, getState) => {
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
    } catch (err) {
      dispatch({
        type: TYPES.POST_SOLUTION_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
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

//update solution
export const upvoteSolution = (solutionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.UPVOTE_SOLUTION_LOADING });

    const options = attachTokenToHeaders(getState);

    const response = await axios.put(
      `${API_URL}/solution/upvote/${solutionId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.UPVOTE_SOLUTION_SUCCESS,
      payload: response.data,
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

export const downvoteSolution = (solutionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.DOWNVOTE_SOLUTION_LOADING });

    const options = attachTokenToHeaders(getState);

    const response = await axios.put(
      `${API_URL}/solution/downvote/${solutionId}`,
      {},
      options
    );

    dispatch({
      type: TYPES.DOWNVOTE_SOLUTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: TYPES.DOWNVOTE_SOLUTION_FAIL,
      payload: {
        error: err?.response?.data.message || err.message,
      },
    });
  }
}