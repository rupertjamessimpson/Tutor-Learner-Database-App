import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Nav from './Nav.js';
import Title from './Title.js';
import Tutors from './components/database/tutors/index.js'
import Learners from './components/database/learners/index.js'
import LearnerDetails from './components/database/learners/details/index.js';
import Matches from './components/database/matches';
import TutorForm from './components/forms/tutors/index.js';
import TutorDetails from './components/database/tutors/details/index.js';
import LearnerForm from './components/forms/learners/index.js';
import Users from './components/database/users/index.js';
import UserForm from './components/forms/users/index.js';
import UserDetails from './components/database/users/details/index.js';
import Conversation from './components/conversation/index.js';

function App() {
  return (
    <BrowserRouter>
      <Title />
      <Nav />
      <Routes>
          <Route path="/" element={<Navigate to="/database/tutors" />} />
          <Route path="/database" element={<Navigate to="/database/tutors" />} />
          <Route path="/database/tutors" element={<Tutors />} />
          <Route path="/database/tutors/:id" element={<TutorDetails />} />
          <Route path="/database/learners" element={<Learners />} />
          <Route path="/database/learners/:id" element={<LearnerDetails />} />
          <Route path="/database/users" element={<Users />} />
          <Route path="/database/users/:id" element={<UserDetails />} />
          <Route path="/database/matches" element={<Matches />} />
          <Route path="/forms" element={<Navigate to="/forms/tutor" />} />
          <Route path="/forms/tutor" element={<TutorForm />} />
          <Route path="/forms/learner" element={<LearnerForm />} />
          <Route path="/forms/user" element={<UserForm />} />
          <Route path="/conversation" element={<Navigate to="/conversation/1" />} />
          <Route path="/conversation/1" element={<Conversation />} />
          <Route path="/conversation/2" element={<Conversation />} />
          <Route path="/conversation/3" element={<Conversation />} />
          <Route path="/conversation/4" element={<Conversation />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
