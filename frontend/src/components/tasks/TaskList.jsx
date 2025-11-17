import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListContainer } from "./TaskList.styles";
import TaskItem from "./TaskItem";

// Use the correct action
import { fetchTasks, updateTaskStatus } from "../../store/actions/taskActions";

// Use the correct selectors
import {
  selectTasks,
  selectTaskLoading,
} from "../../store/selectors/taskSelectors";

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectTaskLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleUpdate = (id, updates) => {
    dispatch(updateTaskStatus(id, updates));
  };

  if (loading) return <p>Loading tasks...</p>;
  if (!tasks?.length) return <p>No tasks available.</p>;

  return (
    <ListContainer>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={handleUpdate} />
      ))}
    </ListContainer>
  );
};

export default TaskList;
