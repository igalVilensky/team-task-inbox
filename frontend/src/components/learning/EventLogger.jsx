// frontend/src/components/learning/EventLogger.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { techColors, getEventColor, getEventIcon } from "../../styles/learningTheme";

const EventLoggerContainer = styled.div`
  background: ${techColors.cardBg};
  border: 1px solid ${techColors.border};
  border-radius: 8px;
  padding: 1rem;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${techColors.border};
`;

const Title = styled.h3`
  margin: 0;
  color: ${techColors.text};
  font-size: 1.1rem;
`;

const EventCount = styled.span`
  color: ${techColors.textMuted};
  font-size: 0.9rem;
`;

const EventList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${techColors.background};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${techColors.border};
    border-radius: 3px;
  }
`;

const EventItem = styled.div`
  background: ${techColors.background};
  border-left: 3px solid ${(props) => props.color};
  padding: 0.75rem;
  border-radius: 4px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const EventIcon = styled.span`
  font-size: 1.2rem;
`;

const EventType = styled.span`
  color: ${(props) => props.color};
  font-weight: 600;
  font-size: 0.9rem;
`;

const EventCategory = styled.span`
  color: ${techColors.textMuted};
  font-size: 0.85rem;
`;

const EventTime = styled.span`
  color: ${techColors.textMuted};
  font-size: 0.75rem;
  margin-left: auto;
`;

const EventDetails = styled.pre`
  margin: 0.5rem 0 0 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 0.75rem;
  color: ${techColors.text};
  overflow-x: auto;
  max-height: 100px;
  overflow-y: auto;
`;

const EventLogger = ({ events }) => {
    const listRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to top when new events arrive
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    }, [events]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <EventLoggerContainer>
            <Header>
                <Title>📊 Real-time Event Log</Title>
                <EventCount>{events.length} events</EventCount>
            </Header>
            <EventList ref={listRef}>
                {events.length === 0 ? (
                    <div style={{ color: techColors.textMuted, textAlign: "center", marginTop: "2rem" }}>
                        No events yet. Try creating a task!
                    </div>
                ) : (
                    events.map((event) => {
                        const color = getEventColor(event.type);
                        const icon = getEventIcon(event.type);

                        return (
                            <EventItem key={event.id} color={color}>
                                <EventHeader>
                                    <EventIcon>{icon}</EventIcon>
                                    <EventType color={color}>{event.type}</EventType>
                                    <EventCategory>{event.category}</EventCategory>
                                    <EventTime>{formatTime(event.timestamp)}</EventTime>
                                </EventHeader>
                                <EventDetails>
                                    {JSON.stringify(event.details, null, 2)}
                                </EventDetails>
                            </EventItem>
                        );
                    })
                )}
            </EventList>
        </EventLoggerContainer>
    );
};

export default EventLogger;
