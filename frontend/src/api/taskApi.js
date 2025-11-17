import apiClient from "./apiClient";

export const fetchTasksApi = async () => {
  const res = await apiClient.get("/tasks");
  return res.data;
};

export const createTaskApi = async (taskData) => {
  const res = await apiClient.post("/tasks", taskData);
  return res.data;
};

export const updateTaskApi = async (taskId, updates) => {
  const res = await apiClient.patch(`/tasks/${taskId}`, updates);
  return res.data;
};
