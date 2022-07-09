// External Import
import axios from "axios";

// Internal Import
import * as TYPES from "../types";
import { BACKEND_API_URL } from "../../constants";
import fi from "date-fns/esm/locale/fi/index.js";

const API_URL = BACKEND_API_URL;

export const askQuestion =
  (formData, navigate) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.ASK_QUESTION_LOADING });

      const options = attachTokenToHeaders(getState);

      const { data } = await axios.post(
        `${API_URL}/question`,
        formData,
        options
      );
      dispatch({ type: TYPES.ASK_QUESTION_SUCCESS, payload: data });
      navigate(`/questions`);
    } catch (err) {
      dispatch({
        type: TYPES.ASK_QUESTION_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    }
  };

export const getAllQuestion = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.GET_ALL_QUESTIONS_LOADING });

    const { data } = await axios.get(`${API_URL}/question`);
    dispatch({ type: TYPES.GET_ALL_QUESTIONS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_QUESTIONS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const scrollLoadingQuestions =
  (pageNumber, searchTerm, selectedCategory) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.QUESTIONS_SCROLL_LOADING });

      const { data } = await axios.get(
        `${API_URL}/question?page=${pageNumber}&q=${searchTerm}&category=${selectedCategory}`
      );
      dispatch({
        type: TYPES.QUESTIONS_SCROLL_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: TYPES.QUESTIONS_SCROLL_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    }
  };

//search question
export const searchQuestion = (search) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.GET_ALL_QUESTIONS_LOADING });

    const { data } = await axios.get(`${API_URL}/question/search/${search}`);
    dispatch({ type: TYPES.GET_ALL_QUESTIONS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TYPES.GET_ALL_QUESTIONS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const upVoteAnyQuestion = (questionId) => async (dispatch, getState) => {
  dispatch({ type: TYPES.UPVOTE_QUESTION_ANY_LOADING });
  const options = attachTokenToHeaders(getState);
  try {
    const response = await axios.post(
      `${API_URL}/question/upvote/${questionId}`,
      {},
      options
    );
    dispatch({
      type: TYPES.UPVOTE_QUESTION_ANY_SUCCESS,
      payload: { questionId, upVote: response.data.upVote },
    });
  } catch (err) {
    dispatch({
      type: TYPES.UPVOTE_QUESTION_ANY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
export const downVoteAnyQuestion =
  (questionId) => async (dispatch, getState) => {
    dispatch({ type: TYPES.DOWNVOTE_QUESTION_ANY_LOADING });
    const options = attachTokenToHeaders(getState);
    try {
      const response = await axios.post(
        `${API_URL}/question/downvote/${questionId}`,
        {},
        options
      );
      dispatch({
        type: TYPES.DOWNVOTE_QUESTION_ANY_SUCCESS,
        payload: { questionId, downVote: response.data.downVote },
      });
    } catch (err) {
      dispatch({
        type: TYPES.DOWNVOTE_QUESTION_ANY_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    }
  };

export const getQuestionForPostSolution =
  (questionId, navigate, enqueueSnackbar) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.GET_QUESTION_FOR_POST_SOLUTION_LOADING });

      const { data } = await axios.get(`${API_URL}/question/id/${questionId}`);
      dispatch({
        type: TYPES.GET_QUESTION_FOR_POST_SOLUTION_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: TYPES.GET_QUESTION_FOR_POST_SOLUTION_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
      navigate(`/questions`);
      enqueueSnackbar(err?.response?.data.message || err.message, {
        variant: "error",
      });
    }
  };

export const reportQuestion =
  (id, reportData, enqueueSnackbar) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TYPES.REPORT_QUESTION_LOADING,
      });
      const options = attachTokenToHeaders(getState);

      const response = await axios.post(
        `${API_URL}/report-question/add/${id}`,
        reportData,
        options
      );

      dispatch({
        type: TYPES.REPORT_QUESTION_SUCCESS,
        payload: {
          report: response.data.report,
        },
      });
      enqueueSnackbar("Reported question successfully", {
        variant: "success",
      });
    } catch (err) {
      dispatch({
        type: TYPES.REPORT_QUESTION_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
      enqueueSnackbar("Failed to report question", {
        variant: "error",
      });
    }
  };

export const getQuestionBySlug =
  (slug, navigate, enqueueSnackbar) => async (dispatch, getState) => {
    try {
      dispatch({ type: TYPES.GET_QUESTION_BY_SLUG_LOADING });

      const response = await axios.get(`${API_URL}/question/slug/${slug}`);

      dispatch({
        type: TYPES.GET_QUESTION_BY_SLUG_SUCCESS,
        payload: { question: response.data.question },
      });
    } catch (err) {
      dispatch({
        type: TYPES.GET_QUESTION_BY_SLUG_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
      if (navigate) {
        navigate(`/questions`);
      }
      if (enqueueSnackbar) {
        enqueueSnackbar(err?.response?.data.message || err.message, {
          variant: "error",
        });
      }
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
