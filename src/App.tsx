import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Tutors from "./tutors";
import Learners from "./learners";
import './libs/bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import './App.css';

function App() {
    return (
      <BrowserRouter>
        <h1 className='title'>Tutor Learner Database</h1>
        <Nav />
        <Routes>
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/learners" element={<Learners />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
