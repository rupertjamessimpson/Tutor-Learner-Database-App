import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import "./index.css";

function Conversation() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [learners, setLearners] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5002/api/learners")
      .then((response) => response.json())
      .then((data) => setLearners(data))
      .catch((err) => console.error('Error fetching learners:', err));
  }, []);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelectChange = () => {
    setIsSelectOpen(false);
  };

  const filterLearners = () => {
    return learners.filter(learner => learner.conversation === parseInt(id));
  };

  const filteredLearners = filterLearners();

  return (
    <div className="data-container">
      <h3 className="header">{"Conversation " + id}</h3>
      <div className="add-container">
        <button onClick={toggleSelect}>Add Learner</button>
        {isSelectOpen && (
          <div>
            <select onChange={handleSelectChange}>
              {learners
                .slice()
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map(learner => (
                  <option key={learner.learner_id} value={learner.learner_id}>
                    {learner.first_name} {learner.last_name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <div className="filters-and-list-container">
        <div className="list-container">
          <ul className="list">
            {filteredLearners.map(learner => (
              <li key={learner.learner_id}>
                <Link to={`/database/learners/${learner.learner_id}`}>
                  {learner.first_name} {learner.last_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Conversation;