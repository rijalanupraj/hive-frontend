import {
  VIEWSOLUTION_LOADING,
  VIEWSOLUTION_SUCCESS,
  VIEWSOLUTION_FAIL,
} from "../types";
const initialState = {
  isLoading: false,
  error: null,
};
export default function solutionReducer(state = initialState, action) {
  switch (action.type) {
    case VIEWSOLUTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case VIEWSOLUTION_SUCCESS:
      return {
        isLoading: false,
        solution: action.payload,
      };
    case VIEWSOLUTION_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
