import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
};

export default function upvoteReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.UPVOTE_SOLUTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.UPVOTE_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        solution: payload.solution,
      };
    case TYPES.UPVOTE_SOLUTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };

    default:
      return state;
  }
}
