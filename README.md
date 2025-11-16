# Team Task Inbox

A compact, portfolio-ready, event-driven full-stack demo application inspired by SocialHub’s unified inbox.  
Instead of social messages, this app manages team tasks that flow through different states.

It demonstrates a modern MERN stack, Redis caching, RabbitMQ messaging, and clean frontend architecture with React, Redux, Redux-Saga, Reselect, and Styled Components.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
  - [Using Docker (Optional)](#using-docker-optional)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Backend

- Create tasks
- List tasks with filters, pagination, and sorting
- Update task status
- Compute task stats (total tasks, tasks by status, unread/new tasks)
- Cache stats in Redis
- Publish events to RabbitMQ: `task.created` and `task.updated`

### Worker Service

- Listens to RabbitMQ queue
- Recomputes task stats
- Refreshes Redis cache

### Frontend

- Task list page with filtering
- Task details panel
- Sidebar with stats
- Mark tasks as done or in-progress
- Clean, responsive UI using Styled Components

### Redux Store

- Actions, reducers, and sagas for async handling
- Selectors with Reselect for memoized derived state

### Testing

- Backend: Mocha & Chai tests for REST endpoints and services
- Frontend: Jest & React Testing Library for reducers, selectors, and components

---

## Architecture

Monorepo structure:

team-task-inbox/
├─ backend/
├─ worker/
├─ frontend/
├─ docker-compose.yml (optional)
└─ README.md

yaml
Copy code

**Backend:** Express, Node.js, MongoDB, Redis, RabbitMQ  
**Worker:** RabbitMQ consumer + Redis updater  
**Frontend:** React + Redux + Redux-Saga + Reselect + Styled Components

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Redis, RabbitMQ
- **Frontend:** React, Redux, Redux-Saga, Reselect, Styled Components
- **Testing:** Mocha/Chai (backend), Jest/React Testing Library (frontend)
- **Optional:** Docker for services and containers

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB 7.x
- Redis 8.x
- RabbitMQ 3.x
- npm or yarn

> All services can be run locally. Docker is optional.

### Running Locally

1. Start MongoDB, Redis, and RabbitMQ:

```bash
# macOS with Homebrew
brew services start mongodb-community@7.0
brew services start redis
brew services start rabbitmq
Install backend dependencies:

bash
Copy code
cd backend
npm install
npm run dev
Install worker dependencies and start:

bash
Copy code
cd worker
npm install
node src/index.js
Install frontend dependencies and start:

bash
Copy code
cd frontend
npm install
npm start
Access the frontend at http://localhost:3000

Using Docker (Optional)
bash
Copy code
docker-compose up -d
docker-compose logs -f tti-mongo
Docker is optional; the app works with local services as described above.

Project Structure
css
Copy code
backend/
  src/
    config/
    controllers/
    models/
    routes/
    services/
    events/
    middleware/
    utils/
    app.js
    server.js
worker/
  src/
    consumers/
    services/
    config/
    utils/
    index.js
frontend/
  src/
    api/
    components/
    pages/
    store/
      actions/
      reducers/
      sagas/
      selectors/
      store.js
    styles/
    tests/
    App.jsx
    index.js
Contributing
Contributions are welcome!

Follow clean architecture patterns

Use async/await

Add meaningful comments

Include tests where appropriate

License
MIT License
```
