import * as TYPES from "../types";

const initialState = {
  users: [],
  topUsers: [],
  isLoading: false,
  error: null
};

export default function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.GET_USERS_LOADING:
    case TYPES.GET_TOP_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.users
      };
    case TYPES.GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        users: [],
        error: payload.error
      };
    case TYPES.GET_TOP_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topUsers: payload.topUsers
      };

    case TYPES.GET_TOP_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        topUsers: [],
        error: payload.error
      };
    default:
      return state;
  }
}
