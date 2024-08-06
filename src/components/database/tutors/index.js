import React from "react";
import { useEffect, useState } from "react";

import "../index.css";

function Tutors() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/tutors")
      .then(response => response.json())
      .then(data => {
        setTutors(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="data-container">
      <h1>Tutors</h1>
      <div className="list-container">
        <ul className="list">
          {tutors.map(tutor => (
            <li key={tutor.id}>
              {tutor.first_name} {tutor.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tutors;