// Internal Import
import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
  question: null,
  questions: [],
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
        isLoading: false,
        question: action.payload,
      };
    case TYPES.ASK_QUESTION_FAIL:
    case TYPES.GET_ALL_QUESTIONS_FAIL:
    case TYPES.SEARCH_QUESTION_FAIL:
    case TYPES.GET_QUESTION_BY_SLUG_FAIL:
      return {
        isLoading: false,
        error: action.payload || action.payload.error,
      };

    case TYPES.GET_ALL_QUESTIONS_SUCCESS:
    case TYPES.SEARCH_QUESTION_SUCCESS:
      return {
        isLoading: false,
        questions: action.payload.questions,
      };

    case TYPES.GET_QUESTION_FOR_POST_SOLUTION_SUCCESS:
      return {
        isLoading: false,
        question: action.payload.question,
      };

    case TYPES.GET_QUESTION_BY_SLUG_SUCCESS:
      return {
        isLoading: false,
        question: action.payload.question,
      };

    default:
      return state;
  }
}
