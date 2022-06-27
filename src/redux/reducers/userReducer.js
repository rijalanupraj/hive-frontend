// Internal Import
import * as TYPES from "../types";

const initialState = {
  profile: {},
  isLoading: false,
  error: null,
  followers: [],
  timelinePosts: [],
  tickets: [],
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.GET_PROFILE_LOADING:
    case TYPES.EDIT_USER_LOADING:
    case TYPES.DELETE_USER_LOADING:
    case TYPES.CHANGE_PASSWORD_LOADING:
    case TYPES.GET_FOLLOWERS_LOADING:
    case TYPES.FOLLOW_UNFOLLOW_USER_LOADING:
    case TYPES.REPORT_USER_LOADING:
    case TYPES.SUGGEST_MISSING_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.profile,
        error: null,
      };
    case TYPES.EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.user,
        error: null,
        success: "Profile updated successfully",
      };
    case TYPES.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: {},
        error: null,
      };

    case TYPES.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "Password changed successfully",
      };

    case TYPES.GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        followers: payload.followers,
        error: null,
      };

    case TYPES.FOLLOW_UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: {
          ...state.profile,
          followers: payload.anotherUser.followers,
        },
      };

    case TYPES.REPORT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "User reported successfully",
      };

    case TYPES.GET_TIMELINE_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        timelinePosts: payload.posts,
        error: null,
      };

    case TYPES.SUGGEST_MISSING_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suggestedCategory: payload.suggestedCategory,
        error: null,
      };

    case TYPES.GET_USER_TICKETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tickets: payload.tickets,
        error: null,
      };

    case TYPES.GET_PROFILE_FAIL:
    case TYPES.EDIT_USER_FAIL:
    case TYPES.DELETE_USER_FAIL:
    case TYPES.CHANGE_PASSWORD_FAIL:
    case TYPES.GET_FOLLOWERS_FAIL:
    case TYPES.FOLLOW_UNFOLLOW_USER_FAIL:
    case TYPES.REPORT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: {},
        error: payload.error,
      };
    default:
      return state;
  }
}
