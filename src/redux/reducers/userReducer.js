// Internal Import
import * as TYPES from '../types';

const initialState = {
  profile: {},
  isLoading: false,
  error: null
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.GET_PROFILE_LOADING:
    case TYPES.EDIT_USER_LOADING:
    case TYPES.DELETE_USER_LOADING:
    case TYPES.CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null
      };
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.profile,
        error: null
      };
    case TYPES.EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.user,
        error: null,
        success: 'Profile updated successfully'
      };
    case TYPES.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: {},
        error: null
      };

    case TYPES.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: 'Password changed successfully'
      };

    case TYPES.GET_PROFILE_FAIL:
    case TYPES.EDIT_USER_FAIL:
    case TYPES.DELETE_USER_FAIL:
    case TYPES.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        profile: {},
        error: payload.error
      };
    default:
      return state;
  }
}
