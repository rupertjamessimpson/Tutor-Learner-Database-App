import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5002/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error('Error fetching user:', err));
  }, [id]);

  const toggleDeleteMessage = () => {
    if (isDeleteMessageOpen) {
      setIsDeleteMessageOpen(false);
    } else {
      setIsDeleteMessageOpen(true);
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:5002/api/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        navigate('/database/users');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const { user } = userData;

  if (!user) {
    return <div></div>;
  }

  return (
    <div className="data-container">
      <h3 className="header">{user.first_name} {user.last_name}</h3>
      <div className="details-container">
        <div className="details">
          <div className="info-and-buttons-container">
            <div className="info">
              <div className="name-details-group">
                <h4 className="name-details-label">Name</h4>
                <div className="info-container">
                  <div className="details-name-container">
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                  </div>
                </div>
              </div>
              <div className="contact-details-group">
                <h4 className="contact-details-label">User Info</h4>
                <div className="info-container">
                  <div className="details-contact-container">
                    <p>{user.email}</p>
                    <p>**********</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <div className="match-and-edit-buttons">
                <button className="edit-button" onClick={() => navigate(`/database/users/edit/${id}`)}>Edit</button>
              </div>
              {isDeleteMessageOpen && (
                <div className="delete-message">
                  <p className="delete-message-text">Are you sure you want to delete this user?</p>
                  <button className="yes-delete-button" onClick={handleDelete}>Yes</button>
                  <button className="no-delete-button" onClick={toggleDeleteMessage}>No</button>
                </div>
              )}
              <button className="delete-button" onClick={toggleDeleteMessage}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;