// frontend/src/components/learning/RabbitMQMonitor.jsx
import React from "react";
import styled from "styled-components";
import { techColors } from "../../styles/learningTheme";

const Container = styled.div`
  background: ${techColors.cardBg};
  border: 1px solid ${techColors.border};
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${techColors.border};
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const Title = styled.h3`
  margin: 0;
  color: ${techColors.text};
  font-size: 1.1rem;
`;

const Status = styled.span`
  margin-left: auto;
  padding: 0.25rem 0.75rem;
  background: ${(props) => (props.connected ? techColors.success : techColors.error)};
  color: white;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Content = styled.div`
  color: ${techColors.text};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${techColors.background};
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  color: ${techColors.textMuted};
  font-size: 0.9rem;
`;

const Value = styled.span`
  color: ${techColors.text};
  font-weight: 600;
  font-family: monospace;
`;

const RoutingKeysSection = styled.div`
  margin-top: 1rem;
`;

const SectionTitle = styled.h4`
  color: ${techColors.text};
  font-size: 0.95rem;
  margin: 0 0 0.75rem 0;
`;

const RoutingKey = styled.div`
  background: ${techColors.background};
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  border-left: 3px solid ${techColors.rabbitmq};
  font-family: monospace;
  font-size: 0.85rem;
  color: ${techColors.rabbitmq};
`;

const RabbitMQMonitor = ({ rabbitmqData, loading }) => {
    if (loading) {
        return (
            <Container>
                <Header>
                    <Icon>📬</Icon>
                    <Title>RabbitMQ</Title>
                </Header>
                <Content>Loading...</Content>
            </Container>
        );
    }

    if (!rabbitmqData) {
        return (
            <Container>
                <Header>
                    <Icon>📬</Icon>
                    <Title>RabbitMQ</Title>
                    <Status connected={false}>Disconnected</Status>
                </Header>
                <Content>No data available</Content>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Icon>📬</Icon>
                <Title>RabbitMQ</Title>
                <Status connected={rabbitmqData.connected}>
                    {rabbitmqData.connected ? "Connected" : "Disconnected"}
                </Status>
            </Header>
            <Content>
                <InfoRow>
                    <Label>Exchange</Label>
                    <Value>{rabbitmqData.exchange}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>Type</Label>
                    <Value>{rabbitmqData.type}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>Durable</Label>
                    <Value>{rabbitmqData.durable ? "Yes" : "No"}</Value>
                </InfoRow>

                {rabbitmqData.routingKeys && (
                    <RoutingKeysSection>
                        <SectionTitle>Routing Keys</SectionTitle>
                        {Object.entries(rabbitmqData.routingKeys).map(([name, key]) => (
                            <RoutingKey key={key}>
                                {name}: {key}
                            </RoutingKey>
                        ))}
                    </RoutingKeysSection>
                )}
            </Content>
        </Container>
    );
};

export default RabbitMQMonitor;
