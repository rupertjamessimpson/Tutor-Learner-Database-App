import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Nav from './Nav.js';
import Login from './components/login/index.js';
import Title from './Title.js';
import Tutors from './components/database/tutors/index.js';
import TutorForm from './components/forms/tutors/index.js';
import TutorDetails from './components/database/tutors/details/index.js';
import TutorEdit from './components/database/tutors/edit/index.js';
import TutorMatch from './components/database/tutors/match/index.js';
import Matches from './components/database/matches';
import Learners from './components/database/learners/index.js';
import LearnerForm from './components/forms/learners/index.js';
import LearnerDetails from './components/database/learners/details/index.js';
import LearnerEdit from './components/database/learners/edit/index.js';
import Users from './components/database/users/index.js';
import UserForm from './components/forms/users/index.js';
import UserDetails from './components/database/users/details/index.js';
import UserEdit from './components/database/users/edit/index.js';
import Conversation from './components/conversation/index.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Title />
      <Nav onLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Navigate to="/database/tutors" />} />
        <Route path="/database" element={<Navigate to="/database/tutors" />} />
        <Route path="/database/tutors" element={<PrivateRoute isAuthenticated={isAuthenticated}><Tutors /></PrivateRoute>} />
        <Route path="/database/tutors/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><TutorDetails /></PrivateRoute>} />
        <Route path="/database/tutors/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><TutorEdit /></PrivateRoute>} />
        <Route path="/database/tutors/match/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><TutorMatch /></PrivateRoute>} />
        <Route path="/database/learners" element={<PrivateRoute isAuthenticated={isAuthenticated}><Learners /></PrivateRoute>} />
        <Route path="/database/learners/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><LearnerDetails /></PrivateRoute>} />
        <Route path="/database/learners/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><LearnerEdit /></PrivateRoute>} />
        <Route path="/database/users" element={<PrivateRoute isAuthenticated={isAuthenticated}><Users /></PrivateRoute>} />
        <Route path="/database/users/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><UserDetails /></PrivateRoute>} />
        <Route path="/database/users/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><UserEdit /></PrivateRoute>} />
        <Route path="/database/matches" element={<PrivateRoute isAuthenticated={isAuthenticated}><Matches /></PrivateRoute>} />
        <Route path="/forms" element={<PrivateRoute isAuthenticated={isAuthenticated}><Navigate to="/forms/tutor" /></PrivateRoute>} />
        <Route path="/forms/tutor" element={<PrivateRoute isAuthenticated={isAuthenticated}><TutorForm /></PrivateRoute>} />
        <Route path="/forms/learner" element={<PrivateRoute isAuthenticated={isAuthenticated}><LearnerForm /></PrivateRoute>} />
        <Route path="/forms/user" element={<PrivateRoute isAuthenticated={isAuthenticated}><UserForm /></PrivateRoute>} />
        <Route path="/conversation" element={<PrivateRoute isAuthenticated={isAuthenticated}><Navigate to="/conversation/1" /></PrivateRoute>} />
        <Route path="/conversation/1" element={<PrivateRoute isAuthenticated={isAuthenticated}><Conversation /></PrivateRoute>} />
        <Route path="/conversation/2" element={<PrivateRoute isAuthenticated={isAuthenticated}><Conversation /></PrivateRoute>} />
        <Route path="/conversation/3" element={<PrivateRoute isAuthenticated={isAuthenticated}><Conversation /></PrivateRoute>} />
        <Route path="/conversation/4" element={<PrivateRoute isAuthenticated={isAuthenticated}><Conversation /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
