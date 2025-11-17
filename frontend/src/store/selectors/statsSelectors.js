import { createSelector } from "reselect";

const selectStatsState = (state) => state.stats;

// Raw
export const selectStats = createSelector(
  [selectStatsState],
  (statsState) => statsState.data
);

export const selectStatsLoading = createSelector(
  [selectStatsState],
  (statsState) => statsState.loading
);

export const selectStatsError = createSelector(
  [selectStatsState],
  (statsState) => statsState.error
);

// Derived
export const selectTotalTasks = createSelector(
  [selectStats],
  (stats) => stats?.totalTasks || 0
);

export const selectStatusBreakdown = createSelector(
  [selectStats],
  (stats) => stats?.byStatus || {}
);

export const selectCountByStatus = (status) =>
  createSelector([selectStatusBreakdown], (byStatus) => byStatus[status] || 0);
