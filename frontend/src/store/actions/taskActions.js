import * as types from "./taskTypes";

// --- Create task ---
export const createTask = (taskData) => ({
  type: types.TASK_CREATE_REQUEST,
  payload: taskData,
});

export const createTaskSuccess = (task) => ({
  type: types.TASK_CREATE_SUCCESS,
  payload: task,
});

export const createTaskFailure = (error) => ({
  type: types.TASK_CREATE_FAILURE,
  payload: error,
});

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

// --- Delete task ---
export const deleteTask = (id) => ({
  type: types.TASK_DELETE_REQUEST,
  payload: id,
});

export const deleteTaskSuccess = (id) => ({
  type: types.TASK_DELETE_SUCCESS,
  payload: id,
});

export const deleteTaskFailure = (error) => ({
  type: types.TASK_DELETE_FAILURE,
  payload: error,
});
