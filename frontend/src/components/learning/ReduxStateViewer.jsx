// frontend/src/components/learning/ReduxStateViewer.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const StateTree = styled.pre`
  background: ${techColors.background};
  padding: 1rem;
  border-radius: 4px;
  color: ${techColors.text};
  font-size: 0.85rem;
  overflow: auto;
  max-height: 400px;
  margin: 0;
  font-family: "Courier New", monospace;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${techColors.cardBg};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${techColors.border};
    border-radius: 3px;
  }
`;

const ReduxStateViewer = () => {
    const state = useSelector((state) => state);

    return (
        <Container>
            <Header>
                <Icon>🔮</Icon>
                <Title>Redux State</Title>
            </Header>
            <StateTree>{JSON.stringify(state, null, 2)}</StateTree>
        </Container>
    );
};

export default ReduxStateViewer;
