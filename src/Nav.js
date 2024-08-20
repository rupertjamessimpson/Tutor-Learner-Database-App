import React from "react";
import { useLocation, Link, NavLink } from 'react-router-dom';

import './App.css';

function Nav() {
  const location = useLocation();
  const inDatabase = location.pathname.startsWith('/database');
  const inForms = location.pathname.startsWith('/forms');
  const inUsers = location.pathname.startsWith('/users');
  const inConversation = location.pathname.startsWith('/conversation');

  return (
    <div className="nav-container">
      <div className="top-nav-container">
        <NavLink 
          to="/database"
          className="nav-button"
          activeClassName="active">
            Database
        </NavLink>
        <NavLink
          to="/forms"
          className="nav-button"
          activeClassName="active">
            Forms
        </NavLink>
        <NavLink
          to="/conversation"
          className="nav-button"
          activeClassName="active">
            Conversation
        </NavLink>
        <NavLink
          to="/users"
          className="nav-button"
          activeClassName="active">
            Users
        </NavLink>
      </div>
      {inDatabase && (
        <div className="sub-nav-container">
            <Link to="/database/tutors" className="sub-nav-button">Tutors</Link>
            <Link to="/database/learners" className="sub-nav-button">Learners</Link>
            <Link to="/database/matches" className="sub-nav-button">Matches</Link>
        </div>)}
      {inForms && (
        <div className="sub-nav-container">
            <Link to="/forms/tutor" className="sub-nav-button">Tutor</Link>
            <Link to="/forms/learner" className="sub-nav-button">Learner</Link>
        </div>)}
      {inConversation && (
        <div className="sub-nav-container">
            <Link to="/conversation/1" className="sub-nav-button">Class 1</Link>
            <Link to="/conversation/2" className="sub-nav-button">Class 2</Link>
            <Link to="/conversation/3" className="sub-nav-button">Class 3</Link>
            <Link to="/conversation/4" className="sub-nav-button">Class 4</Link>
        </div>)}
      {inUsers && (
        <div className="sub-nav-container">
            <Link to="/users/list" className="sub-nav-button">List</Link>
            <Link to="/users/form" className="sub-nav-button">Form</Link>
        </div>)}
    </div>
  );
}

export default Nav;