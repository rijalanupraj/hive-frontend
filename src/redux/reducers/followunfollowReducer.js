import * as TYPES from "../types";

const initialState = {
  isLoading: false,
  error: null,
};

export default function followunfollowReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case TYPES.FOLLOW_USER_LOADING:
    case TYPES.UNFOLLOW_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case TYPES.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload.user,
      };
    case TYPES.FOLLOW_USER_FAIL:
    case TYPES.UNFOLLOW_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case TYPES.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload.user,
      };
    default:
      return state;
  }
}
