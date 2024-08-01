import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Title from './Title.js';
import Nav from './Nav';
import Tutors from './components/database/tutors/index.js'
import Learners from './components/database/learners/index.js'
import Matches from './components/database/matches';
import TutorForm from './components/forms/tutors/index.js';
import LearnerForm from './components/forms/learners/index.js';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Title />
      <Nav />
      <Routes>
          <Route path="/" element={<Tutors />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/learners" element={<Learners />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/tutor-form" element={<TutorForm />} />
          <Route path="/learner-form" element={<LearnerForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
