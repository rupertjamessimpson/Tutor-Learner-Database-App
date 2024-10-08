import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import capitalizeName from "../../../../exports/functions/capitalizeName";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`https://www.tutorlearnerdatabase.com/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { user: userData } = data;

        setUser({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password,
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  console.log(user);

  const validateForm = () => {
    const newErrors = {};

    if (!user.first_name.trim()) newErrors.first_name = "First name is required";
    if (!user.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    if (!user.password.trim()) newErrors.password = "Password is required";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email && !emailPattern.test(user.email)) newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const capitalizedUser = {
      ...user,
      first_name: capitalizeName(user.first_name),
      last_name: capitalizeName(user.last_name)
    };
    if (validateForm()) {
      try {
        const response = await fetch(`https://www.tutorlearnerdatabase.com/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(capitalizedUser),
        });
  
        if (response.ok) {
          navigate(`/database/users/${id}`);
        } else {
          const data = await response.json();
          console.error("Server error:", data);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div className="data-container">
      <div className="header-and-errors-container">
        <h3 className="header">Add a User</h3>
        {Object.keys(errors).length > 0 && (
          <ul className="error-list">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-container">
        <div className="form">
          <form>
            <div className="user-form-group">
              <h4 className="user-form-label">Name</h4>
              <div className="user-form-input-container">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  value={user.first_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={user.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="user-form-group">
              <h4 className="user-form-label">User Info</h4>
              <div className="user-form-input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button-container">
              <button className="submit-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={() => navigate(`/database/users/${id}`)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default UserEdit;
