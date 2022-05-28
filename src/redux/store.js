import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,
  registerReducer,
  userReducer,
  usersReducer,
  solutionReducer,
  questionReducer,
  tagReducer,
  viewSolutionReducer,
  upvoteReducer,
  downvoteReducer,
} from "./reducers/";

const reducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  user: userReducer,
  users: usersReducer,
  solution: solutionReducer,
  question: questionReducer,
  tag: tagReducer,
  viewSolutions: viewSolutionReducer,
  upvoteSolution: upvoteReducer,
  downvoteSolution: downvoteReducer,
});

let initialState = {
  vote: {
    votes: localStorage.getItem("votes")
      ? JSON.parse(localStorage.getItem("votes"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
