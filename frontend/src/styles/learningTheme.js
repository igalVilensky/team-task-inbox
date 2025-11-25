// frontend/src/styles/learningTheme.js
export const techColors = {
    react: "#61DAFB",
    redux: "#764ABC",
    saga: "#89D96D",
    rabbitmq: "#FF6600",
    redis: "#DC382D",
    mongodb: "#47A248",
    worker: "#FDB515",
    api: "#0EA5E9",
    background: "#0F172A",
    cardBg: "#1E293B",
    text: "#F1F5F9",
    textMuted: "#94A3B8",
    border: "#334155",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
};

export const animations = {
    pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
    slideIn: `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
    glow: `
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px currentColor; }
      50% { box-shadow: 0 0 20px currentColor; }
    }
  `,
    dataFlow: `
    @keyframes dataFlow {
      0% { transform: translateX(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
  `,
};

export const getEventColor = (eventType) => {
    const colorMap = {
        API: techColors.api,
        RABBITMQ: techColors.rabbitmq,
        REDIS: techColors.redis,
        MONGODB: techColors.mongodb,
        SAGA: techColors.saga,
    };
    return colorMap[eventType] || techColors.text;
};

export const getEventIcon = (eventType) => {
    const iconMap = {
        API: "🌐",
        RABBITMQ: "📬",
        REDIS: "⚡",
        MONGODB: "🗄️",
        SAGA: "⚙️",
    };
    return iconMap[eventType] || "📝";
};
