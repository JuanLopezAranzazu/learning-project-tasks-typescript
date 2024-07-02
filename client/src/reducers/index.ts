import { combineReducers } from "redux";
// reducers
import authReducer from "./auth";
import taskReducer from "./task";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export default rootReducer;
