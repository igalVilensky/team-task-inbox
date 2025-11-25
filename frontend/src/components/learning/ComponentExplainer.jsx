// frontend/src/components/learning/ComponentExplainer.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { techColors } from "../../styles/learningTheme";

const Container = styled.div`
  background: ${techColors.cardBg};
  border: 1px solid ${techColors.border};
  border-radius: 8px;
  padding: 1.5rem;
`;

const Header = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${techColors.text};
  font-size: 1.5rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: ${techColors.background};
  border: 2px solid ${(props) => props.color};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.span`
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.color};
  font-size: 1.2rem;
`;

const CardDescription = styled.p`
  color: ${techColors.text};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
`;

const CardRole = styled.div`
  color: ${techColors.textMuted};
  font-size: 0.85rem;
  font-style: italic;
`;

const components = [
    {
        id: "react-redux",
        icon: "⚛️",
        title: "React + Redux",
        color: techColors.react,
        description: "React handles the UI, while Redux manages the application state in a predictable way. All state changes go through actions and reducers.",
        role: "Frontend state management and UI rendering",
    },
    {
        id: "redux-saga",
        icon: "⚙️",
        title: "Redux-Saga",
        color: techColors.saga,
        description: "Saga intercepts Redux actions and handles side effects like API calls. It uses generator functions to manage async flow elegantly.",
        role: "Async operations and side effects",
    },
    {
        id: "rabbitmq",
        icon: "📬",
        title: "RabbitMQ",
        color: techColors.rabbitmq,
        description: "Message broker that enables async communication between services. Uses publish/subscribe pattern with routing keys to deliver messages.",
        role: "Event-driven architecture and decoupling",
    },
    {
        id: "redis",
        icon: "⚡",
        title: "Redis",
        color: techColors.redis,
        description: "In-memory data store used for caching. Dramatically speeds up read operations by storing frequently accessed data in RAM.",
        role: "High-performance caching layer",
    },
    {
        id: "mongodb",
        icon: "🗄️",
        title: "MongoDB",
        color: techColors.mongodb,
        description: "NoSQL database that stores data as flexible JSON-like documents. Perfect for rapidly evolving schemas and complex data structures.",
        role: "Persistent data storage",
    },
    {
        id: "worker",
        icon: "👷",
        title: "Worker Process",
        color: techColors.worker,
        description: "Background service that consumes RabbitMQ messages and performs tasks like updating caches, sending notifications, or processing data.",
        role: "Background job processing",
    },
];

const ComponentExplainer = () => {
    return (
        <Container>
            <Header>🎓 Tech Stack Components</Header>
            <CardsGrid>
                {components.map((component) => (
                    <Card key={component.id} color={component.color}>
                        <CardHeader>
                            <CardIcon>{component.icon}</CardIcon>
                            <CardTitle color={component.color}>{component.title}</CardTitle>
                        </CardHeader>
                        <CardDescription>{component.description}</CardDescription>
                        <CardRole>Role: {component.role}</CardRole>
                    </Card>
                ))}
            </CardsGrid>
        </Container>
    );
};

export default ComponentExplainer;
