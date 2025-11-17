import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 240px;
  padding: 16px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StatCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const StatTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
`;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
`;
