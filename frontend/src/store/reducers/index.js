import { combineReducers } from "redux"; // <--- add this

import taskReducer from "./taskReducer";
import statsReducer from "./statsReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  stats: statsReducer,
});

export default rootReducer;
