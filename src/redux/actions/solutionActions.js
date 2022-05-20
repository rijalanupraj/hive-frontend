import axios from "axios";

import {
  ASKQUESTION_LOADING,
  ASKQUESTION_SUCCESS,
  ASKQUESTION_FAIL,
} from "../types";

const API_URL = "http://localhost:8000/api/v1";

export const viewSolution = (id) => async (dispatch) => {
  try {
    dispatch({ type: ASKQUESTION_LOADING });
    const { data } = await axios.get(`${API_URL}/solution/${id}`);
    dispatch({
      type: ASKQUESTION_SUCCESS,
      payload: data.solution,
    });
  } catch (error) {
    dispatch({
      type: ASKQUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};
