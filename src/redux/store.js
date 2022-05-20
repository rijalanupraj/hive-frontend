import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,
  registerReducer,
  userReducer,
  usersReducer,
  questionReducer,
  solutionReducer,
} from "./reducers/";

const reducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
  users: usersReducer,
  question: questionReducer,
  solution: solutionReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
