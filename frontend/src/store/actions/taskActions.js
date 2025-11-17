import * as types from "./taskTypes";

// --- Fetch tasks ---
export const fetchTasks = () => ({
  type: types.TASK_FETCH_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
  type: types.TASK_FETCH_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: types.TASK_FETCH_FAILURE,
  payload: error,
});

// --- Update task status ---
export const updateTaskStatus = (id, updates) => ({
  type: types.TASK_UPDATE_STATUS_REQUEST,
  payload: { id, updates },
});

export const updateTaskStatusSuccess = (task) => ({
  type: types.TASK_UPDATE_STATUS_SUCCESS,
  payload: task,
});

export const updateTaskStatusFailure = (error) => ({
  type: types.TASK_UPDATE_STATUS_FAILURE,
  payload: error,
});
