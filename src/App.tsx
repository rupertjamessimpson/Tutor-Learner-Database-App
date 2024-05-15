import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Tutors from "./componenets/tutors";
import Learners from "./componenets/learners";
import './libs/bootstrap/dist/css/bootstrap.min.css';
import Nav from './componenets/general/Nav';
import Title from './componenets/general/title';
import './App.css';

function App() {
    return (
      <BrowserRouter>
        <Title />
        <Nav />
        <Routes>
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/learners" element={<Learners />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
