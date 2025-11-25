// frontend/src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import LearningDashboard from "./pages/LearningDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page -> TasksPage */}
        <Route path="/" element={<TasksPage />} />

        {/* Learning Dashboard */}
        <Route path="/learn" element={<LearningDashboard />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
