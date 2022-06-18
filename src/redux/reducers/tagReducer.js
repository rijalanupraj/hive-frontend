// Internal Import
import * as TYPES from '../types';

const initialValues = {
  tagsList: [],
  loading: false,
  error: null
};

const tagReducer = (state = initialValues, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_TAGS_LOADING:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_ALL_TAGS_SUCCESS:
      return {
        ...state,
        tagsList: action.payload.tags,
        loading: false
      };
    case TYPES.GET_ALL_TAGS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
};

export default tagReducer;
