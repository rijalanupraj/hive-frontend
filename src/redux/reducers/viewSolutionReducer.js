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
    case TYPES.UPVOTE_SOLUTION_LOADING:
    case TYPES.DOWNVOTE_SOLUTION_LOADING:
    case TYPES.ADD_COMMENT_LOADING:
    case TYPES.UPDATE_COMMENT_LOADING:
    case TYPES.DELETE_COMMENT_LOADING:
    case TYPES.REPORT_SOLUTION_LOADING:
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
    case TYPES.UPVOTE_SOLUTION_SUCCESS:
    case TYPES.DOWNVOTE_SOLUTION_SUCCESS:
      console.log(payload.updatedSolution);
      return {
        ...state,
        solution: {
          ...state.solution,
          upVotes: payload.updatedSolution.upVotes,
          downVotes: payload.updatedSolution.downVotes,
        },
      };
    case TYPES.REPORT_SOLUTION_SUCCESS:
      return {
        ...state,
        solution: {
          ...state.solution,
          reportSol: [...state.solution.report, payload.newReport],
        },
      };

    case TYPES.UPVOTE_SOLUTION_FAIL:
    case TYPES.DOWNVOTE_SOLUTION_FAIL:
    case TYPES.ADD_COMMENT_FAIL:
    case TYPES.UPDATE_COMMENT_FAIL:
    case TYPES.DELETE_COMMENT_FAIL:
    case TYPES.REPORT_SOLUTION_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case TYPES.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        solution: {
          ...state.solution,
          comments: [...state.solution.comments, payload.newComment],
        },
      };

    case TYPES.UPDATE_COMMENT_SUCCESS:
      const updatedComments = state.solution.comments.map((comment) => {
        if (comment._id === payload.updatedComment._id) {
          return payload.updatedComment;
        }
        return comment;
      });

      return {
        ...state,
        solution: {
          ...state.solution,
          comments: updatedComments,
        },
      };
    case TYPES.DELETE_COMMENT_SUCCESS:
      const updatedCommentsList = state.solution.comments.filter((comment) => {
        return comment._id !== payload.commentId;
      });
      console.log(updatedCommentsList);
      return {
        ...state,
        solution: {
          ...state.solution,
          comments: updatedCommentsList,
        },
      };

    default:
      return state;
  }
}
