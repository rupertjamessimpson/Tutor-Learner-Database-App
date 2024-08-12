import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LearnerDetails() {
  const { id } = useParams();
  const [learnerData, setLearnerData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5002/api/learners/${id}`)
      .then((response) => response.json())
      .then((data) => setLearnerData(data))
      .catch((err) => console.error('Error fetching learner:', err));
  }, [id]);

  const { learner, availability } = learnerData;

  if (!learner) {
    return <div></div>;
  }

  return (
    <div>
      <h1>{learner.first_name} {learner.last_name}</h1>
      <p>Email: {learner.email}</p>
      <p>Phone: {learner.phone}</p>
      <p>Level: {learner.level}</p>
      <h2>Availability</h2>
      <ul>
        {availability && availability.map((slot, index) => (
          <li key={index}>{slot.day}: {slot.start_time} - {slot.end_time}</li>
        ))}
      </ul>
    </div>
  );
}

export default LearnerDetails;
