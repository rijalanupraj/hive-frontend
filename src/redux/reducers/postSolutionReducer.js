import {
    POST_SOLUTION_REQUEST,
    POST_SOLUTION_SUCCESS,
    POST_SOLUTION_FAIL,
  } from '../types';
  
  const initialState = {
    isLoading: false,
    error: null
  };
  
  export default function postSolutionReducer(state = initialState, { type, payload }) {
    switch (type) {
      case POST_SOLUTION_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case POST_SOLUTION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null
        };
      case POST_SOLUTION_FAIL:
        return {
          ...state,
          isLoading: false,
          error: payload.error
        };
      default:
        return state;
    }
  }