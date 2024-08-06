import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Nav from './Nav.js';
import Title from './Title.js';
import Tutors from './components/database/tutors/index.js'
import Learners from './components/database/learners/index.js'
import Matches from './components/database/matches';
import TutorForm from './components/forms/tutors/index.js';
import LearnerForm from './components/forms/learners/index.js';
import UsersList from './components/users/list/index.js';
import UserForm from './components/users/create/index.js';

function App() {
  return (
    <BrowserRouter>
      <Title />
      <Nav />
      <Routes>
          <Route path="/" element={<Tutors />} />
          <Route path="/database" element={<Navigate to="/database/tutors" />} />
          <Route path="/database/tutors" element={<Tutors />} />
          <Route path="/database/learners" element={<Learners />} />
          <Route path="/database/matches" element={<Matches />} />
          <Route path="/forms" element={<Navigate to="/forms/tutor" />} />
          <Route path="/forms/tutor" element={<TutorForm />} />
          <Route path="/forms/learner" element={<LearnerForm />} />
          <Route path="/users" element={<Navigate to="/users/list" />} />
          <Route path="/users/list" element={<UsersList />} />
          <Route path="/users/form" element={<UserForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
