// frontend/src/pages/LearningDashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { techColors } from "../styles/learningTheme";
import { startPolling, stopPolling } from "../store/actions/systemActions";
import { fetchTasks } from "../store/actions/taskActions";
import EventLogger from "../components/learning/EventLogger";
import RedisViewer from "../components/learning/RedisViewer";
import RabbitMQMonitor from "../components/learning/RabbitMQMonitor";
import ReduxStateViewer from "../components/learning/ReduxStateViewer";
import InteractiveCRUD from "../components/learning/InteractiveCRUD";
import ComponentExplainer from "../components/learning/ComponentExplainer";

const Container = styled.div`
  min-height: 100vh;
  background: ${techColors.background};
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${techColors.text};
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(
    135deg,
    ${techColors.react},
    ${techColors.redux},
    ${techColors.saga}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: ${techColors.textMuted};
  font-size: 1.1rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${techColors.border};
  padding-bottom: 0;
  overflow-x: auto;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: ${(props) => (props.active ? techColors.cardBg : "transparent")};
  color: ${(props) => (props.active ? techColors.react : techColors.textMuted)};
  border: none;
  border-bottom: 3px solid ${(props) => (props.active ? techColors.react : "transparent")};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  margin-bottom: -2px;
  white-space: nowrap;

  &:hover {
    color: ${techColors.react};
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

const Content = styled.div`
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const FullWidth = styled.div`
  margin-bottom: 1.5rem;
`;

const LearningDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");

  const events = useSelector((state) => state.system.events.data);
  const redisData = useSelector((state) => state.system.redis.data);
  const redisLoading = useSelector((state) => state.system.redis.loading);
  const rabbitmqData = useSelector((state) => state.system.rabbitmq.data);
  const rabbitmqLoading = useSelector((state) => state.system.rabbitmq.loading);

  useEffect(() => {
    // Fetch tasks on mount
    dispatch(fetchTasks());

    // Only start polling on tabs that need real-time updates
    if (activeTab === "overview" || activeTab === "monitoring") {
      dispatch(startPolling());
    } else {
      dispatch(stopPolling());
    }

    // Cleanup: stop polling on unmount
    return () => {
      dispatch(stopPolling());
    };
  }, [dispatch, activeTab]);

  return (
    <Container>
      <Header>
        <Title>🎓 Interactive Learning Dashboard</Title>
        <Subtitle>
          Understand your tech stack by seeing it in action
        </Subtitle>
      </Header>

      <TabContainer>
        <Tab active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
          📊 Overview
        </Tab>
        <Tab active={activeTab === "crud"} onClick={() => setActiveTab("crud")}>
          ✨ Interactive CRUD
        </Tab>
        <Tab active={activeTab === "monitoring"} onClick={() => setActiveTab("monitoring")}>
          🔍 Monitoring
        </Tab>
        <Tab active={activeTab === "learn"} onClick={() => setActiveTab("learn")}>
          🎓 Learn
        </Tab>
      </TabContainer>

      <Content>
        {activeTab === "overview" && (
          <>
            <FullWidth>
              <EventLogger events={events} />
            </FullWidth>
            <Grid>
              <RedisViewer redisData={redisData} loading={redisLoading} />
              <RabbitMQMonitor rabbitmqData={rabbitmqData} loading={rabbitmqLoading} />
            </Grid>
          </>
        )}

        {activeTab === "crud" && (
          <FullWidth>
            <InteractiveCRUD />
          </FullWidth>
        )}

        {activeTab === "monitoring" && (
          <>
            <Grid>
              <EventLogger events={events} />
              <ReduxStateViewer />
            </Grid>
            <Grid>
              <RedisViewer redisData={redisData} loading={redisLoading} />
              <RabbitMQMonitor rabbitmqData={rabbitmqData} loading={rabbitmqLoading} />
            </Grid>
          </>
        )}

        {activeTab === "learn" && (
          <FullWidth>
            <ComponentExplainer />
          </FullWidth>
        )}
      </Content>
    </Container>
  );
};

export default LearningDashboard;
