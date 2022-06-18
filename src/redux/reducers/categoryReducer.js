// Internal Import
import * as TYPES from "../types";

const initialValues = {
  categoryList: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialValues, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: action.payload.categories,
        loading: false,
      };
    case TYPES.GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
