import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    conversation: false,
    esl_novice: false,
    esl_beginner: false,
    esl_intermediate: false,
    citizenship: false,
    sped_ela: false,
    basic_math: false,
    hiset_math: false,
    basic_reading: false,
    hiset_reading: false,
    basic_writing: false,
    hiset_writing: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5002/api/tutors/`)
      .then((response) => response.json())
      .then((data) => setTutors(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredTutors = tutors.filter(tutor => {
    return `${tutor.first_name} ${tutor.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="data-container">
      <h1>Tutors</h1>
      <input
        type="text"
        placeholder="Search tutors"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={toggleSidebar}>Filter</button>
      <div className="list-container">
        <ul className="list">
          {filteredTutors.map(tutor => (
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