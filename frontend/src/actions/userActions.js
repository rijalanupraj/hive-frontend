import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    CLEAR_ERRORS,

} from "../constants/userConstants";

import axios from "axios";

//login
export const userLogin = (emailOrUsername, password)=>async(dispatch)=>{
  
    try{
        dispatch({ type: LOGIN_REQUEST });   

        // const config = { headers: { "Content-Type":"application/json" } };
        // console.log(email, password);

        const { data } = await axios.post(`/api/v1/auth/login`, {emailOrUsername, password});
        // console.log(email, password);        

        dispatch({type:LOGIN_SUCCESS, payload: data.user });

    }catch(error){
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }

};

//register
export const userRegister = (userData) => async (dispatch) => {
  
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      // const config = { headers: { "Content-Type": "multipart/form-data" } };
    
      
  
      const { data } = await axios.post(`/api/v1/auth/register`, userData);
      // console.log(data);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};