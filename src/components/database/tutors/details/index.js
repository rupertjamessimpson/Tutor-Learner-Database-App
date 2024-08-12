import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TutorDetails() {
  const { id } = useParams();
  const [tutorData, setTutordata] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5002/api/tutors/${id}`)
      .then((response) => response.json())
      .then((data) => setTutordata(data))
      .catch((err) => console.error('Error fetching tutor:', err));
  }, [id]);

  const { tutor, preferences, availability } = tutorData;

  if (!tutor) {
    return <div></div>;
  }

  return (
    <div>
      <h1>{tutor.first_name} {tutor.last_name}</h1>
      <p>Email: {tutor.email}</p>
      <p>Phone: {tutor.phone}</p>
      <h2>Preferences</h2>
      <ul>
        {preferences && Object.entries(preferences).map(([key, value]) => (
          <li key={key}>{key}: {value ? "Yes" : "No"}</li>
        ))}
      </ul>
      <h2>Availability</h2>
      <ul>
        {availability && availability.map((slot, index) => (
          <li key={index}>{slot.day}: {slot.start_time} - {slot.end_time}</li>
        ))}
      </ul>
    </div>
  );
}

export default TutorDetails;