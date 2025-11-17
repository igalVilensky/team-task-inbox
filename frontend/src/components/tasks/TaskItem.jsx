import React from "react";
import { TaskCard, Title, Status, Button } from "./TaskList.styles";

const TaskItem = ({ task, onUpdate }) => {
  const { _id, title, status } = task;

  const nextStatus =
    status === "new" ? "in-progress" : status === "in-progress" ? "done" : null;

  return (
    <TaskCard>
      <div>
        <Title>{title}</Title>
        <Status>Status: {status}</Status>
      </div>

      {nextStatus && (
        <Button onClick={() => onUpdate(_id, { status: nextStatus })}>
          Mark {nextStatus}
        </Button>
      )}
    </TaskCard>
  );
};

export default TaskItem;
