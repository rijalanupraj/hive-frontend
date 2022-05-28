// Internal Import
import * as TYPES from '../types';

const initialState = {
  isLoading: false,
  error: null
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ASK_QUESTION_LOADING:
    case TYPES.GET_ALL_QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case TYPES.ASK_QUESTION_SUCCESS:
      return {
        isLoading: false,
        question: action.payload
      };
    case TYPES.ASK_QUESTION_FAIL:
    case TYPES.GET_ALL_QUESTIONS_FAIL:
      return {
        isLoading: false,
        error: action.payload
      };

    case TYPES.GET_ALL_QUESTIONS_SUCCESS:
      return {
        isLoading: false,
        questions: action.payload.questions
      };

    default:
      return state;
  }
}
