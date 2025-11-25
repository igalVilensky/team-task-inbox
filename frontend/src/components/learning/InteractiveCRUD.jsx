// frontend/src/components/learning/InteractiveCRUD.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { techColors } from "../../styles/learningTheme";
import { createTask, updateTaskStatus, deleteTask } from "../../store/actions/taskActions";
import { selectTasks } from "../../store/selectors/taskSelectors";

const Container = styled.div`
  background: ${techColors.cardBg};
  border: 1px solid ${techColors.border};
  border-radius: 8px;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 4px;
  }
`;

const Header = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${techColors.text};
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  background: ${techColors.background};
  border: 1px solid ${techColors.border};
  border-radius: 4px;
  color: ${techColors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${techColors.react};
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${techColors.react};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${techColors.redux};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExplanationBox = styled.div`
  background: rgba(97, 218, 251, 0.1);
  border-left: 3px solid ${techColors.react};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const ExplanationTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: ${techColors.react};
  font-size: 1rem;
`;

const ExplanationText = styled.p`
  margin: 0;
  color: ${techColors.text};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TaskItem = styled.div`
  background: ${techColors.background};
  padding: 1rem;
  border-radius: 4px;
  border-left: 3px solid ${(props) => (props.status === "done" ? techColors.success : techColors.warning)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskTitle = styled.div`
  color: ${techColors.text};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const TaskMeta = styled.div`
  color: ${techColors.textMuted};
  font-size: 0.85rem;
`;

const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) => (props.status === "done" ? techColors.warning : techColors.success)};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.75rem;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${techColors.error};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    background: #dc2626;
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.75rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InteractiveCRUD = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(createTask({ title, status: "new" }));
      setTitle("");
    }
  };

  const handleToggleStatus = (task) => {
    const newStatus = task.status === "new" ? "done" : "new";
    dispatch(updateTaskStatus(task._id, { status: newStatus }));
  };

  const handleDelete = (task) => {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <Container>
      <Header>✨ Interactive Task Management</Header>

      <ExplanationBox>
        <ExplanationTitle>🎓 What happens when you create a task?</ExplanationTitle>
        <ExplanationText>
          1. <strong>React Component</strong> dispatches a Redux action<br />
          2. <strong>Redux-Saga</strong> intercepts the action and makes an API call<br />
          3. <strong>Backend API</strong> receives the request and saves to MongoDB<br />
          4. <strong>RabbitMQ</strong> publishes a "task.created" event<br />
          5. <strong>Worker</strong> consumes the event and updates Redis cache<br />
          6. <strong>Saga</strong> updates Redux state with the new task<br />
          <br />
          Watch the Event Logger to see each step in real-time!
        </ExplanationText>
      </ExplanationBox>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit">Create Task</Button>
      </Form>

      <TaskList>
        {tasks.data && tasks.data.length > 0 ? (
          tasks.data.map((task) => (
            <TaskItem key={task._id} status={task.status}>
              <TaskInfo>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>
                  Status: {task.status} • Created: {new Date(task.createdAt).toLocaleString()}
                </TaskMeta>
              </TaskInfo>
              <ButtonGroup>
                <StatusButton
                  status={task.status}
                  onClick={() => handleToggleStatus(task)}
                >
                  Mark as {task.status === "new" ? "Done" : "New"}
                </StatusButton>
                <DeleteButton onClick={() => handleDelete(task)}>
                  🗑️ Delete
                </DeleteButton>
              </ButtonGroup>
            </TaskItem>
          ))
        ) : (
          <div style={{ color: techColors.textMuted, textAlign: "center", padding: "2rem" }}>
            No tasks yet. Create one above!
          </div>
        )}
      </TaskList>
    </Container>
  );
};

export default InteractiveCRUD;
