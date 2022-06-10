// Internal Import
import * as TYPES from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  me: null,
  error: null,
  appLoaded: false
};

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.ME_LOADING:
      return {
        ...state,
        isLoading: true,
        appLoaded: false,
        error: null
      };
    case TYPES.LOGIN_WITH_EMAIL_LOADING:
    case TYPES.LOGIN_WITH_OAUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.LOGIN_WITH_EMAIL_SUCCESS:
    case TYPES.LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        me: payload.me,
        error: null
      };
    case TYPES.ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        me: payload.me,
        error: null,
        appLoaded: true
      };

    case TYPES.VIEW_MY_FOLLOWINGS_LOADING:
      return {
        ...state,
        followingLoading: true
      };

    case TYPES.VIEW_MY_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        followingLoading: false,
        me: {
          ...state.me,
          followingsObject: payload.followings
        }
      };
    case TYPES.VIEW_MY_FOLLOWINGS_FAIL:
    case TYPES.ME_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        followingLoading: false,
        me: null,
        error: null,
        appLoaded: true
      };
    case TYPES.FOLLOW_UNFOLLOW_ANY_USER_SUCCESS:
      const followingsArray = payload.mineFollowers.followings;
      console.log(followingsArray);
      return {
        ...state,
        me: {
          ...state.me,
          followings: followingsArray
        }
      };

    case TYPES.TOGGLE_BOOKMARK_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          bookmarks: payload.me.bookmarks
        }
      };

    case TYPES.GET_MY_FOLLOWERS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedFollowers: payload.followers
        }
      };

    case TYPES.GET_MY_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedFollowings: payload.followings
        }
      };

    case TYPES.GET_MY_BOOKMARKS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          expandedBookmarks: payload.bookmarks
        }
      };

    case TYPES.LOGOUT_SUCCESS:
    case TYPES.LOGIN_WITH_EMAIL_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        me: null,
        isAuthenticated: false,
        isLoading: false,
        error: payload.error ? payload.error : null
      };
    default:
      return state;
  }
}
