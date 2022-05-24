import axios from "axios";

//internal import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const viewSolution = (solutionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.VIEW_SOLUTION_LOADING });

    const response = await axios.get(
      `${API_URL}/solution/${solutionId}`,
      
    );

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
