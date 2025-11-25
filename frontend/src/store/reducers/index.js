import { combineReducers } from "redux"; // <--- add this

import taskReducer from "./taskReducer";
import statsReducer from "./statsReducer";
import systemReducer from "./systemReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  stats: statsReducer,
  system: systemReducer,
});

export default rootReducer;
