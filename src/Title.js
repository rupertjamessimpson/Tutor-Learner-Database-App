import React from 'react';
import logo from './database-logo.png';
import './App.css';

function Title() {
  return (
    <div className="title-container">
      <h2 className="title-text">Tutor Learner Database</h2>
      <img className="title-logo" src={logo} alt="Logo"/>
    </div>
  );
}

export default Title;