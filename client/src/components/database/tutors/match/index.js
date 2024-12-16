import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import convertTime from "../../../../exports/functions/convertTime";

function TutorMatch() {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook for navigation
  const [tutorData, setTutorData] = useState({});
  const [learnerAvailability, setLearnerAvailability] = useState([]);
  const [toggleSelect, setToggleSelect] = useState(false);

  useEffect(() => {
    fetch(`https://www.tutorlearnerdatabase.com/api/tutors/${id}`)
      .then((response) => response.json())
      .then((data) => setTutorData(data))
      .catch((err) => console.error('Error fetching tutor:', err));
  }, [id]);

  useEffect(() => {
    fetch(`https://www.tutorlearnerdatabase.com/api/learners/availability`)
      .then((response) => response.json())
      .then((data) => setLearnerAvailability(data))
      .catch((err) => console.error('Error fetching learner availability:', err));
  }, [id]);

  const handleMatch = (learnerID) => {
    const payload = {
      tutor_id: id,
      learner_id: learnerID,
    };
    
    fetch('https://www.tutorlearnerdatabase.com/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate('/database/matches');
        } else {
          alert(`Error creating/updating match: ${data.message || 'Unknown error'}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const filterLearners = () => {
    const { preferences, availability: tutorAvailability } = tutorData;
  
    if (!preferences || !tutorAvailability) return [];
  
    // Extract preferred levels from tutor preferences
    const preferredLevels = Object.entries(preferences)
      .filter(([key, value]) => key !== 'tutor_id' && value)
      .map(([key]) => key);
  
    // Transform tutor availability into a day-keyed object
    const tutorAvailabilityByDay = tutorAvailability.reduce((acc, slot) => {
      if (!acc[slot.day]) acc[slot.day] = [];
      acc[slot.day].push({ start_time: slot.start_time, end_time: slot.end_time });
      return acc;
    }, {});
  
    // Reduce learners based on availability and matching preferences
    const availableLearners = learnerAvailability.reduce((acc, curr) => {
      if (curr.available && preferredLevels.includes(curr.level)) {
        // Check if the learner's time overlaps with the tutor's time
        const tutorDayAvailability = tutorAvailabilityByDay[curr.day]; // Get tutor's availability for this day
  
        if (tutorDayAvailability && tutorDayAvailability.length > 0) {
          const hasTimeOverlap = tutorDayAvailability.some(tutorSlot => {
            const tutorStart = new Date(`1970-01-01T${tutorSlot.start_time}`);
            const tutorEnd = new Date(`1970-01-01T${tutorSlot.end_time}`);
            const learnerStart = new Date(`1970-01-01T${curr.start_time}`);
            const learnerEnd = new Date(`1970-01-01T${curr.end_time}`);
  
            // Check for any overlap between tutor and learner availability
            return learnerEnd > tutorStart && tutorEnd > learnerStart;
          });
  
          if (hasTimeOverlap) {
            if (!acc[curr.learner_id]) {
              acc[curr.learner_id] = {
                learner_id: curr.learner_id,
                name: `${curr.first_name} ${curr.last_name}`,
                level: curr.level,
                availability: {},
              };
            }
            if (!acc[curr.learner_id].availability[curr.day]) {
              acc[curr.learner_id].availability[curr.day] = [];
            }
            acc[curr.learner_id].availability[curr.day].push({
              start_time: curr.start_time,
              end_time: curr.end_time,
            });
          }
        }
      }
      return acc;
    }, {});
  
    return Object.values(availableLearners);
  };  

  const getAllLearners = () => {
    const allLearners = learnerAvailability.reduce((acc, curr) => {
      if (!acc[curr.learner_id]) {
        acc[curr.learner_id] = {
          learner_id: curr.learner_id,
          name: `${curr.first_name} ${curr.last_name}`,
          level: curr.level
        };
      }
      return acc;
    }, {});
  
    return Object.values(allLearners);
  }; 

  const learners = filterLearners();
  const allLearners = getAllLearners();

  return (
    <div className="data-container">
      <h3 className="header">
        {tutorData.tutor ? `${tutorData.tutor.first_name} ${tutorData.tutor.last_name}` : 'Loading...'}
      </h3>
      <div className="learner-select-container">
        <div>
          <button className="filterButton" onClick={() => setToggleSelect(!toggleSelect)}>
            Choose Specific Learner
          </button>
          {toggleSelect && (
            <select onChange={(e) => {
              const selectedLearner = allLearners.find(l => l.name === e.target.value);
              if (selectedLearner) {
                handleMatch(selectedLearner.learner_id);
                setToggleSelect(false);
              }
            }}>
              <option value="">Select a Learner</option>
              {allLearners.map((learner) => (
                <option key={learner.name} value={learner.name}>
                  {learner.name} ({learner.level.replace('_', ' ')})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="filters-and-list-container">
        <div className="list-container">
          <ul className="list">
            {learners.map((learner) => (
              <li key={learner.name}>
                <div className="learner-match-name">
                  <strong>{learner.name} ({learner.level.replace('_', ' ')})</strong>
                  <button className="match-match-button" onClick={() => handleMatch(learner.learner_id)}>Match</button>
                </div>
                <ul>
                  {Object.entries(learner.availability).map(([day, slots]) => (
                    <li className="availability-item" key={day}>
                      {slots.map((slot, index) => (
                        <div key={index}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}: {convertTime(slot.start_time)} - {convertTime(slot.end_time)}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TutorMatch;
