import { createSelector } from "reselect";

// Base slice
const selectTaskState = (state) => state.tasks;

// Raw selectors
export const selectTasks = createSelector(
  [selectTaskState],
  (taskState) => taskState.items
);

export const selectTaskLoading = createSelector(
  [selectTaskState],
  (taskState) => taskState.loading
);

export const selectTaskError = createSelector(
  [selectTaskState],
  (taskState) => taskState.error
);

// Derived selectors

// Count tasks by status
export const selectTasksByStatus = (status) =>
  createSelector([selectTasks], (tasks) =>
    tasks.filter((task) => task.status === status)
  );

// Example: list only "new" tasks
export const selectNewTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((t) => t.status === "new")
);

// Example: list only "in-progress"
export const selectInProgressTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((t) => t.status === "in-progress")
);

// Example: list only "done"
export const selectDoneTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((t) => t.status === "done")
);
