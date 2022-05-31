import * as TYPES from '../types';

const initialState = {
  isLoading: false,
  error: null
};

export default function viewSolutionReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.VIEW_SOLUTION_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case TYPES.VIEW_SOLUTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        solution: payload.solution
      };
    case TYPES.VIEW_SOLUTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    case TYPES.UPVOTE_SOLUTION_SUCCESS:
    case TYPES.DOWNVOTE_SOLUTION_SUCCESS:
      console.log(payload.updatedSolution);
      return {
        ...state,
        solution: {
          ...state.solution,
          upVotes: payload.updatedSolution.upVotes,
          downVotes: payload.updatedSolution.downVotes
        }
      };
    case TYPES.UPVOTE_SOLUTION_FAIL:
    case TYPES.DOWNVOTE_SOLUTION_FAIL:
      return {
        ...state,
        error: payload.error
      };

    default:
      return state;
  }
}
