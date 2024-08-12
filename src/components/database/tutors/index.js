import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Tutors() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/api/tutors/`)
      .then((response) => response.json())
      .then((data) => setTutors(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="data-container">
      <h1>Tutors</h1>
      <div className="list-container">
        <ul className="list">
          {tutors.map(tutor => (
            <li key={tutor.tutor_id}>
              <Link to={`/database/tutors/${tutor.tutor_id}`}>
                {tutor.first_name} {tutor.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tutors;