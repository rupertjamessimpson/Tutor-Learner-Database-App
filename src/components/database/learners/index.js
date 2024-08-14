import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Learners() {
  const [learners, setLearners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    available: false,
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
    fetch("http://localhost:5002/api/learners")
      .then(response => response.json())
      .then(data => {setLearners(data)})
      .catch(err => {console.log(err)});
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const applyFilters = () => {
    return learners.filter(learner => {
      let matchesFilters = true;
  
      const matchesSearchQuery = `${learner.first_name} ${learner.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
  
      const matchesLevel = Object.keys(filters).slice(1, 12).some(key => {
        if (filters[key]) {
          return learner.level === key;
        }
        return false;
      });
  
      const matchDaysAvailable = Object.keys(filters).slice(13).every(day => {
        if (filters[day]) {
          return learner[day];
        }
        return true;
      });
  
      const matchesAvailability = filters.available ? learner.available : true;
  
      if (Object.values(filters).some(filter => filter)) {
        matchesFilters = matchesSearchQuery && matchesLevel && matchDaysAvailable && matchesAvailability;
      } else {
        matchesFilters = matchesSearchQuery;
      }
  
      return matchesFilters;
    });
  };
  

  const filteredLearners = applyFilters();

  return (
    <div className="data-container">
      <h3 className="header">Learners</h3>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search Learners"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="filterButton" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
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
        {isSidebarOpen && (
          <div className="sidebar">
            <form>
              <div key="available">
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={filters.available}
                    onChange={handleFilterChange}
                  />available
                </label>
              </div>
              <h3>Level</h3>
              {Object.keys(filters).slice(1, 12).map((preference) => (
                <div key={preference}>
                  <label>
                    <input
                      type="checkbox"
                      name={preference}
                      checked={filters[preference]}
                      onChange={handleFilterChange}
                    />
                    {preference.replace('_', ' ')}
                  </label>
                </div>
              ))}
              <h3>Days Available</h3>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                <div key={day}>
                  <label>
                    <input
                      type="checkbox"
                      name={day}
                      checked={filters[day]}
                      onChange={handleFilterChange}
                    />
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Learners;