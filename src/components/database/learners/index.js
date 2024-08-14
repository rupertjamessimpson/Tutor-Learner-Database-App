import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Learners() {
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/learners")
      .then(response => response.json())
      .then(data => {setLearners(data)})
      .catch(err => {console.log(err)});
  }, []);

  return (
    <div className="data-container">
      <h1>Learners</h1>
      <div className="list-container">
        <ul className="list">
          {learners.map(learner => (
            <li key={learner.learner_id}>
              <Link to={`/database/learners/${learner.learner_id}`}>
                {learner.first_name} {learner.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Learners;