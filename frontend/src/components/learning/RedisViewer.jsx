// frontend/src/components/learning/RedisViewer.jsx
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

const KeyCount = styled.div`
  font-size: 0.9rem;
  color: ${techColors.textMuted};
  margin-bottom: 1rem;
`;

const CacheItem = styled.div`
  background: ${techColors.background};
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  border-left: 3px solid ${techColors.redis};
`;

const KeyName = styled.div`
  font-weight: 600;
  color: ${techColors.redis};
  margin-bottom: 0.5rem;
  font-family: monospace;
`;

const ValueContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const Value = styled.pre`
  margin: 0;
  font-size: 0.85rem;
  color: ${techColors.text};
  overflow-x: auto;
`;

const TTL = styled.div`
  font-size: 0.75rem;
  color: ${techColors.textMuted};
`;

const RedisViewer = ({ redisData, loading }) => {
    if (loading) {
        return (
            <Container>
                <Header>
                    <Icon>⚡</Icon>
                    <Title>Redis Cache</Title>
                </Header>
                <Content>Loading...</Content>
            </Container>
        );
    }

    if (!redisData) {
        return (
            <Container>
                <Header>
                    <Icon>⚡</Icon>
                    <Title>Redis Cache</Title>
                    <Status connected={false}>Disconnected</Status>
                </Header>
                <Content>No data available</Content>
            </Container>
        );
    }

    const cacheEntries = Object.entries(redisData.cache || {});

    return (
        <Container>
            <Header>
                <Icon>⚡</Icon>
                <Title>Redis Cache</Title>
                <Status connected={redisData.connected}>
                    {redisData.connected ? "Connected" : "Disconnected"}
                </Status>
            </Header>
            <Content>
                <KeyCount>
                    {redisData.totalKeys} cached {redisData.totalKeys === 1 ? "key" : "keys"}
                </KeyCount>
                {cacheEntries.length === 0 ? (
                    <div style={{ color: techColors.textMuted }}>Cache is empty</div>
                ) : (
                    cacheEntries.map(([key, data]) => (
                        <CacheItem key={key}>
                            <KeyName>{key}</KeyName>
                            <ValueContainer>
                                <Value>{JSON.stringify(data.value, null, 2)}</Value>
                            </ValueContainer>
                            <TTL>
                                TTL: {typeof data.ttl === "number" ? `${data.ttl}s` : data.ttl}
                            </TTL>
                        </CacheItem>
                    ))
                )}
            </Content>
        </Container>
    );
};

export default RedisViewer;
