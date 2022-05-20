import axios from "axios";

import { attachTokenToHeaders } from "./authActions";
import {
  ASKQUESTION_LOADING,
  ASKQUESTION_SUCCESS,
  ASKQUESTION_FAIL,
} from "../types";

const API_URL = "http://localhost:8000/api/v1";

// export const askQuestion =
//   (formData, navigate) => async (dispatch, getState) => {
//     dispatch({ type: ASKQUESTION_LOADING });

//     try {
//       await axios.post(`${API_URL}/question`, formData);
//       dispatch({
//         type: ASKQUESTION_SUCCESS,
//       });
//       navigate("/solution");
//     } catch (err) {
//       dispatch({
//         type: ASKQUESTION_FAIL,
//         payload: { error: err?.response?.data.message || err.message },
//       });
//     }
//   };

export const askQuestion =
  (formData, navigate) => async (dispatch, getState) => {
    try {
      dispatch({ type: ASKQUESTION_LOADING });
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/question`,
        formData,
        options
      );
      dispatch({ type: ASKQUESTION_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ASKQUESTION_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    }
  };
