// Internal Import
import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
  question: null,
  questions: [],
  pageNumber: null,
  allLoaded: false,
  scrollLoading: false,
  totalPage: null,
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ASK_QUESTION_LOADING:
    case TYPES.GET_ALL_QUESTIONS_LOADING:
    case TYPES.SEARCH_QUESTION_LOADING:
    case TYPES.GET_QUESTION_BY_SLUG_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.ASK_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        question: action.payload,
      };
    case TYPES.ASK_QUESTION_FAIL:
    case TYPES.GET_ALL_QUESTIONS_FAIL:
    case TYPES.SEARCH_QUESTION_FAIL:
    case TYPES.GET_QUESTION_BY_SLUG_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || action.payload.error,
      };

    case TYPES.GET_ALL_QUESTIONS_SUCCESS:
    case TYPES.SEARCH_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload.questions,
        pageNumber: action.payload.page,
        totalPage: action.payload.pages,
        allLoaded: action.payload.pages === action.payload.page,
      };

    case TYPES.GET_QUESTION_FOR_POST_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        question: action.payload.question,
      };

    case TYPES.GET_QUESTION_BY_SLUG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        question: action.payload.question,
      };

    case TYPES.QUESTIONS_SCROLL_LOADING:
      return {
        ...state,
        scrollLoading: true,
      };

    case TYPES.QUESTIONS_SCROLL_SUCCESS:
      let newQuestions = [...state.questions];

      if (action.payload.page === 1) {
        newQuestions = action.payload.questions;
      } else {
        newQuestions = [...newQuestions, ...action.payload.questions];
      }
      return {
        ...state,
        questions: newQuestions,
        scrollLoading: false,
        pageNumber: action.payload.page,
        totalPage: action.payload.pages,
        allLoaded: action.payload.pages === action.payload.page,
      };

    case TYPES.QUESTIONS_SCROLL_FAIL:
      return {
        ...state,
        scrollLoading: false,
        error: action.payload || action.payload.error,
      };

    default:
      return state;
  }
}
