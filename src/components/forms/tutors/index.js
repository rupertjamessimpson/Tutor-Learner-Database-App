import React, { useState } from "react";
import "../index.css"
import times from "../../../exports/data/times";

function TutorsForm() {
  const [tutor, setTutor] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    available: true,
    preferences: {
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
      hiset_writing: false
    },
    availability: {
      monday: { start_time: "", end_time: "" },
      tuesday: { start_time: "", end_time: "" },
      wednesday: { start_time: "", end_time: "" },
      thursday: { start_time: "", end_time: "" },
      friday: { start_time: "", end_time: "" }
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'text') {
      setTutor((prevTutor) => ({
        ...prevTutor,
        [name]: value
      }));
    } else if (type === 'checkbox') {
      const [category, field] = name.split('.');
      setTutor((prevTutor) => ({
        ...prevTutor,
        [category]: {
          ...prevTutor[category],
          [field]: checked
        }
      }));
    } else {
      const [day, timeType] = name.split('.');
      setTutor((prevTutor) => ({
        ...prevTutor,
        availability: {
          ...prevTutor.availability,
          [day]: {
            ...prevTutor.availability[day],
            [timeType]: value
          }
        }
      }));
    }
  };

  return (
    <div className="form-container">
      <h3 className="header">Add a Tutor</h3>
      <form>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={tutor.first_name}
          onChange={handleChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={tutor.last_name}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={tutor.phone}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={tutor.email}
          onChange={handleChange}
        />
        <h4>Preferences</h4>
        {Object.keys(tutor.preferences).map((preference) => (
          <div key={preference}>
            <label htmlFor={preference}>{preference.replace('_', ' ').toLowerCase()}</label>
            <input
              type="checkbox"
              id={preference}
              name={`preferences.${preference}`}
              checked={tutor.preferences[preference]}
              onChange={handleChange}
            />
          </div>
        ))}
        <h4>Availability</h4>
        {Object.keys(tutor.availability).map((day) => (
          <div key={day}>
            <h5>{day.charAt(0).toUpperCase() + day.slice(1)}</h5>
            <label htmlFor={`${day}.start_time`}>Start Time</label>
            <select
              id={`${day}.start_time`}
              name={`${day}.start_time`}
              value={tutor.availability[day].start_time}
              onChange={handleChange}
            >
              <option value="">Unavailable</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <label htmlFor={`${day}.end_time`}>End Time</label>
            <select
              id={`${day}.end_time`}
              name={`${day}.end_time`}
              value={tutor.availability[day].end_time}
              onChange={handleChange}
            >
              <option value="">Unavailable</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TutorsForm;
