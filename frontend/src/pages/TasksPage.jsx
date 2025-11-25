// frontend/src/pages/TasksPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "../components/tasks/TaskList";
import StatsSidebar from "../components/stats/StatsSidebar";
import { fetchTasks, updateTaskStatus } from "../store/actions/taskActions";
import { fetchStats } from "../store/actions/statsActions";
import { selectTasks } from "../store/selectors/taskSelectors";
import { selectStats } from "../store/selectors/statsSelectors";

const TasksPage = () => {
  const dispatch = useDispatch();

  const tasksState = useSelector(selectTasks);
  const stats = useSelector(selectStats);

  useEffect(() => {
    // Fetch tasks and stats on mount
    dispatch(fetchTasks());
    dispatch(fetchStats());
  }, [dispatch]);

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus(taskId, newStatus));
    // After updating, refresh stats
    dispatch(fetchStats());
  };

  return (
    <div style={{ display: "flex", padding: "1rem" }}>
      {/* Task list */}
      <div style={{ flex: 3, marginRight: "1rem" }}>
        <TaskList tasks={tasksState.data || []} onStatusChange={handleStatusChange} />
      </div>

      {/* Stats sidebar */}
      <div style={{ flex: 1 }}>
        <StatsSidebar stats={stats} />
      </div>
    </div>
  );
};

export default TasksPage;
