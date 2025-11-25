# Team Task Inbox

A full-stack task management application with an **Interactive Learning Dashboard** that helps you understand modern web architecture by visualizing data flow through React, Redux, Saga, RabbitMQ, Redis, and MongoDB in real-time.

## 🎓 Interactive Learning Dashboard

**NEW!** Access the educational dashboard at `http://localhost:3000/learn` to see your tech stack in action.

### Features

- **📊 Real-time Event Logging** - Watch every operation (API calls, MongoDB queries, RabbitMQ messages, Redis cache operations) as it happens
- **⚡ Redis Cache Viewer** - See cached data with TTL information
- **📬 RabbitMQ Monitor** - View message queue status, exchange configuration, and routing keys
- **🔮 Redux State Viewer** - Inspect the complete Redux state tree
- **✨ Interactive CRUD** - Create, update, and delete tasks while watching the data flow through each layer
- **🎓 Component Explainer** - Learn about each technology's role in the architecture

### What You'll Learn

The dashboard visualizes the complete data flow:
1. **React Component** → dispatches Redux action
2. **Redux-Saga** → intercepts and makes API call
3. **Backend API** → saves to MongoDB
4. **RabbitMQ** → publishes event
5. **Worker** → consumes event and updates Redis cache
6. **Saga** → updates Redux state

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 with Hooks
- Redux + Redux-Saga for state management
- Styled Components for styling
- Axios for API calls
- Webpack 5 dev server

**Backend:**
- Node.js + Express
- MongoDB with Mongoose ODM
- Redis for caching
- RabbitMQ for event-driven architecture

**Worker:**
- Background task processor
- Consumes RabbitMQ events
- Updates Redis cache
- Processes async operations

### System Architecture

```
┌─────────────┐
│   React UI  │ ← User Interface
└──────┬──────┘
       │
       ↓
┌─────────────┐
│Redux + Saga │ ← State Management
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Backend    │ ← REST API
│  (Express)  │
└──────┬──────┘
       │
       ├──→ MongoDB (Persistent Storage)
       │
       └──→ RabbitMQ (Event Bus)
              │
              ↓
         ┌─────────┐
         │ Worker  │ ← Background Processing
         └────┬────┘
              │
              └──→ Redis (Cache)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running on `localhost:27017`
- Redis running on `localhost:6379`
- RabbitMQ running on `localhost:5672`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd team-task-inbox
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install

   # Worker
   cd ../worker && npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/team-task-inbox
   REDIS_URL=redis://localhost:6379
   RABBITMQ_URL=amqp://127.0.0.1:5672
   ```

### Running the Application

You need to run three services simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
App runs on `http://localhost:3000`

**Terminal 3 - Worker:**
```bash
cd worker
node src/index.js
```

### Access Points

- **Main App**: http://localhost:3000
- **Learning Dashboard**: http://localhost:3000/learn ← **Start here!**
- **Backend API**: http://localhost:3001/api/v1
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)

## 📚 API Endpoints

### Tasks

- `GET /api/v1/tasks` - List all tasks
- `POST /api/v1/tasks` - Create a new task
- `PATCH /api/v1/tasks/:id` - Update a task
- `DELETE /api/v1/tasks/:id` - Delete a task
- `GET /api/v1/tasks/stats` - Get task statistics

### System Monitoring (Educational)

- `GET /api/v1/system/health` - System health check
- `GET /api/v1/system/redis` - View Redis cache contents
- `GET /api/v1/system/rabbitmq` - RabbitMQ status
- `GET /api/v1/system/events` - Real-time event log

## 🎯 Key Features

### Task Management
- ✅ Create tasks with title and status
- ✅ Update task status (new → done)
- ✅ Delete tasks with confirmation
- ✅ Real-time statistics
- ✅ Responsive mobile design

### Event-Driven Architecture
- ✅ RabbitMQ topic exchange
- ✅ Event publishing on task changes
- ✅ Worker consumes events asynchronously
- ✅ Automatic cache invalidation

### Performance Optimization
- ✅ Redis caching for statistics
- ✅ Cache hit/miss tracking
- ✅ Automatic cache updates via worker

### Educational Features
- ✅ Real-time event logging
- ✅ Visual data flow diagrams
- ✅ Component explanations
- ✅ Redux state inspection
- ✅ Interactive CRUD with step-by-step explanations

## 🔧 Development

### Project Structure

```
team-task-inbox/
├── backend/           # Express API server
│   ├── src/
│   │   ├── config/    # Database, Redis, RabbitMQ config
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/     # Event logger
│   └── package.json
├── frontend/          # React application
│   ├── src/
│   │   ├── api/       # API clients
│   │   ├── components/
│   │   │   └── learning/  # Learning dashboard components
│   │   ├── pages/
│   │   │   └── LearningDashboard.jsx
│   │   ├── store/     # Redux setup
│   │   └── styles/    # Learning theme
│   └── package.json
├── worker/            # Background processor
│   ├── src/
│   │   ├── config/
│   │   ├── consumers/
│   │   └── services/
│   └── package.json
└── README.md
```

### Technologies Deep Dive

**Why RabbitMQ?**
- Decouples backend from worker
- Enables async processing
- Reliable message delivery
- Scales horizontally

**Why Redis?**
- In-memory caching for fast reads
- Reduces MongoDB load
- TTL support for automatic expiration
- Pub/Sub capabilities

**Why Redux-Saga?**
- Handles complex async flows
- Easy to test
- Centralized side effects
- Better error handling than thunks

## 📱 Mobile Support

The Learning Dashboard is fully responsive:
- Single-column layout on mobile
- Touch-friendly buttons
- Scrollable tabs
- Optimized font sizes

## 🎨 UI/UX Features

- **Smart Polling**: Only polls when viewing monitoring tabs (5-second intervals)
- **Color-Coded Events**: Each technology has its own color for easy identification
- **Smooth Animations**: Fade-in effects and transitions
- **Dark Theme**: Modern dark UI optimized for learning

## 🧪 Testing the Learning Dashboard

1. Navigate to http://localhost:3000/learn
2. Go to "Interactive CRUD" tab
3. Create a new task
4. Switch to "Overview" tab
5. Watch the Event Logger show:
   - API request
   - MongoDB CREATE
   - RabbitMQ PUBLISH
   - Worker processing
   - Redis cache update

## 🤝 Contributing

This project is designed for learning. Feel free to:
- Explore the codebase
- Modify components
- Add new features
- Experiment with the architecture

## 📄 License

MIT

## 🙏 Acknowledgments

Built to demonstrate modern full-stack architecture with:
- Event-driven design patterns
- Microservices communication
- State management best practices
- Real-time data visualization

---

**Start Learning**: Visit http://localhost:3000/learn to see your tech stack in action! 🚀
