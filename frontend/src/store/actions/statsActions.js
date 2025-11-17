import * as types from "./statsTypes";

export const fetchStats = () => ({
  type: types.STATS_FETCH_REQUEST,
});

export const fetchStatsSuccess = (stats) => ({
  type: types.STATS_FETCH_SUCCESS,
  payload: stats,
});

export const fetchStatsFailure = (error) => ({
  type: types.STATS_FETCH_FAILURE,
  payload: error,
});
