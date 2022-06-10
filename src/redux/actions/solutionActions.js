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
      navigate(`/solution/${response.data.answer._id}`);
    } catch (err) {
      dispatch({
        type: TYPES.POST_SOLUTION_FAIL,
        payload: {
          error: err?.response?.data.message || err.message,
        },
      });
    }
  };

export const updateSolution =
  (solutionId, jsonData, navigate) => async (dispatch, getState) => {
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
      navigate(`/solution/${response.data.answer._id}`);
    } catch (err) {
      dispatch({
        type: TYPES.UPDATE_SOLUTION_FAIL,
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
