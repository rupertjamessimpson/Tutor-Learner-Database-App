import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5002/api/matches`)
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  }, []);

  const applyFilters = () => {
    return matches.filter(match => {
      const matchesSearchQuery = 
        `${match.tutor_first_name} ${match.tutor_last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        `${match.learner_first_name} ${match.learner_last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
  
      return matchesSearchQuery;
    });
  };

  const filteredMatches = applyFilters();

  return (
    <div className="data-container">
      <h3 className="header">Matches</h3>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search Matches"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-and-list-container">
        <div className="list-container">
          <ul className="list">
            {filteredMatches.map((match) => (
              <li key={match.match_id}>
                <Link to={`/database/tutors/${match.tutor_id}`}>
                  {match.tutor_first_name} {match.tutor_last_name} {" - "}
                </Link>
                <Link to={`/database/learners/${match.learner_id}`}>
                  {match.learner_first_name} {match.learner_last_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Matches;