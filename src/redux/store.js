import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  authReducer,
  registerReducer,
  userReducer,
  usersReducer,
  solutionReducer,
  questionReducer,
  tagReducer
} from './reducers/';

const reducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
  users: usersReducer,
  solution: solutionReducer,
  question: questionReducer,
  tag: tagReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
