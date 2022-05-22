// Internal Import
import * as TYPES from '../types';

const initialState = {
  isLoading: false,
  error: null
};

export default function registerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.REGISTER_WITH_EMAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.REGISTER_WITH_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: payload.message
      };
    case TYPES.REGISTER_WITH_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      };
    case TYPES.RESET_EMAIL_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    default:
      return state;
  }
}
