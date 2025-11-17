import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

export const TaskCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

export const Status = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

export const Button = styled.button`
  background: #007bff;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #0067d9;
  }
`;
