import {
    POST_SOLUTION_REQUEST,
    POST_SOLUTION_SUCCESS,
    POST_SOLUTION_FAIL,
  } from '../types';
  
const initialState = {
    isLoading: false,
    error: null
};


export default function  postSolutionReducer (state = initialState, { type, payload }) {
  switch (type) {
    case POST_SOLUTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_SOLUTION_SUCCESS:
      return {
        loading: false,
        success: payload.success,
      };
    case POST_SOLUTION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.success,
      };

    default:
      return state;
  }
};

