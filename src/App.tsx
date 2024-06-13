import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Conversation from './componenets/conversation';
import Email from './componenets/email';
import Forms from './componenets/forms';
import Hours from './componenets/hours';
import Learners from "./componenets/learners";
import Matches from './componenets/matches';
import Nav from './componenets/general/Nav';
import Title from './componenets/general/title';
import Tutors from "./componenets/tutors";

import './libs/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
      <BrowserRouter>
        <Title />
        <Nav />
        <Routes>
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/learners" element={<Learners />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/email" element={<Email />} />
          <Route path="/hours" element={<Hours />} />
          <Route path="/forms" element={<Forms />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;