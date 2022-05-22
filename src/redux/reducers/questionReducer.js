// Internal Import
import * as TYPES from '../types';

const initialState = {
  isLoading: false,
  error: null
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ASK_QUESTION_LOADING:
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
      return {
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
