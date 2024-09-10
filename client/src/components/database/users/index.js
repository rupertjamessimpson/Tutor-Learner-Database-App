import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`https://www.tutorlearnerdatabase.com/api/users/`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const applyFilters = () => {
    return users.filter(user => {
      const matchesSearchQuery = `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearchQuery;
    });
  };

  const filteredUsers = applyFilters();

  return (
    <div className="data-container">
      <h3 className="header">Users</h3>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="list-container">
        <ul className="list">
          {filteredUsers.map((user) => (
            <li key={user.user_id}>
              <Link to={`/database/users/${user.user_id}`}>
                {user.first_name} {user.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;