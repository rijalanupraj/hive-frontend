import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
};

export default function viewSolutionReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case TYPES.VIEW_SOLUTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.VIEW_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        solution: payload.solution,
      };
    case TYPES.VIEW_SOLUTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };

    default:
      return state;
  }
}
