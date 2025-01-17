// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";

const API_URL = BACKEND_API_URL;

export const getAllCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.GET_ALL_CATEGORY_LOADING });

    const options = attachTokenToHeaders(getState);

    const { data } = await axios.get(`${API_URL}/category`, options);
    dispatch({ type: TYPES.GET_ALL_CATEGORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_CATEGORY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const suggestNewCategory =
  (categoryData, enqueueSnackbar) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.SUGGEST_MISSING_CATEGORIES_LOADING });

      const options = attachTokenToHeaders(getState);

      const { data } = await axios.post(
        `${API_URL}/users/suggest-category`,
        categoryData,
        options
      );
      dispatch({
        type: TYPES.SUGGEST_MISSING_CATEGORIES_SUCCESS,
        payload: data,
      });
      enqueueSnackbar("Category Suggested Successfully", {
        variant: "success",
      });
    } catch (err) {
      dispatch({
        type: TYPES.SUGGEST_MISSING_CATEGORIES_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
      enqueueSnackbar(err?.response?.data.message || err.message, {
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
