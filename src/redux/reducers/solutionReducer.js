// Internal Import
import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
  solutions: [],
  homeSolutions: [],
  homePageNumber: null,
  homeAllLoaded: false,
  homeScrollLoading: false,
  homeTotalPage: null,
};

export default function solutionReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case TYPES.POST_SOLUTION_REQUEST:
    case TYPES.UPDATE_SOLUTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.GET_ALL_SOLUTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        homeScrollLoading: true,
      };
    case TYPES.POST_SOLUTION_SUCCESS:
    case TYPES.UPDATE_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case TYPES.GET_ALL_SOLUTIONS_SUCCESS:
      let newHomeSolutions;
      if (payload.page === 1) {
        newHomeSolutions = payload.solutions;
      } else {
        newHomeSolutions = [...state.homeSolutions, ...payload.solutions];
      }

      return {
        ...state,
        isLoading: false,
        error: null,
        homeSolutions: newHomeSolutions,
        homeScrollLoading: false,
        homePageNumber: payload.page,
        homeTotalPage: payload.pages,
        homeAllLoaded: payload.pages === payload.page,
      };

    case TYPES.GET_SOLUTIONS_BY_QUESTION_SLUG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        solutions: payload.solutions,
      };

    case TYPES.GET_ALL_SOLUTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        homeScrollLoading: false,
        error: payload.error,
      };
    case TYPES.POST_SOLUTION_FAIL:
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
