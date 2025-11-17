import apiClient from "./apiClient";

export const fetchStatsApi = async () => {
  const res = await apiClient.get("/stats");
  return res.data;
};
