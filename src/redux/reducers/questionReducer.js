import {
  ASKQUESTION_LOADING,
  ASKQUESTION_SUCCESS,
  ASKQUESTION_FAIL,
  CLEAR_ERRORS,
} from "../types";

const initialState = {
  isLoading: false,
  error: null,
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case ASKQUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ASKQUESTION_SUCCESS:
      return {
        isLoading: false,
        question: action.payload,
      };
    case ASKQUESTION_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
