import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    available: false,
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
    return tutors.filter(tutor => {
      const matchesSearchQuery = `${tutor.first_name} ${tutor.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilters = Object.keys(filters).every(key => {
        if (filters[key]) {
          return tutor[key];
        }
        return true;
      });

      return matchesSearchQuery && matchesFilters;
    });
  };

  const filteredTutors = applyFilters();

  return (
    <div className="data-container">
      <h3 className="header" >Tutors</h3>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search Tutors"
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
            {filteredTutors.map(tutor => (
              <li key={tutor.tutor_id}>
                <Link to={`/database/tutors/${tutor.tutor_id}`}>
                  {tutor.first_name} {tutor.last_name}
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
              <h3>Preferences</h3>
              {Object.keys(filters).slice(1, 13).map((preference) => (
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

export default Tutors;