// Internal Import
import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
};

export default function solutionReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case TYPES.POST_SOLUTION_REQUEST:
    case TYPES.GET_ALL_SOLUTIONS_LOADING:
    case TYPES.UPDATE_SOLUTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.POST_SOLUTION_SUCCESS:
    case TYPES.UPDATE_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case TYPES.GET_ALL_SOLUTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        homeSolutions: payload.solutions,
      };
    case TYPES.POST_SOLUTION_FAIL:
    case TYPES.GET_ALL_SOLUTIONS_FAIL:
    case TYPES.UPDATE_SOLUTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };

    default:
      return state;
  }
}
