import React from "react";
import { useEffect, useState } from "react";

import "../index.css";

function Learners() {
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/learners")
      .then(response => response.json())
      .then(data => {
        setLearners(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="data-container">
      <h1>Learners</h1>
      <div className="list-container">
        <ul className="list">
          {learners.map(learner => (
            <li key={learner.id}>
              {learner.first_name} {learner.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Learners;
