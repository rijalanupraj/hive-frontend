
import { LOGIN_REQUEST, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    CLEAR_ERRORS,
} from "../constants/userConstants.js";

export const userReducer = (state = { user:{} }, action)=>{
switch (action.type){
   case LOGIN_REQUEST:
   case REGISTER_USER_REQUEST:
       return {
           loading: true,
           isAuthenticated: false,
       };
   case LOGIN_SUCCESS:
   case REGISTER_USER_SUCCESS:
       return {
           ...state,
           loading: false,
           isAuthenticated: true,
           user: action.payload,
       };

   case LOGIN_FAIL:
   case REGISTER_USER_FAIL:
       return {
           ...state,
           loading: false,
           isAuthenticated: false,
           user: null,
           error: action.payload,
       };

   case CLEAR_ERRORS:
       return {
           ...state,
           error: null,
       };
   default:
       return state;
};

};


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
};
