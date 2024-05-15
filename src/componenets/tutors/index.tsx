import React, { useState, useEffect } from "react";
import { Tutor } from '../../types/tutors';

function Tutors() {
    const [tutors, setTutors] = useState<Tutor[]>([]);

    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        try {
            const response = await fetch('http://localhost:5001/tutors');
            const data = await response.json();
            setTutors(data);
        } catch (error) {
            console.error('Error fetching tutors:', error);
        }
    };

    return (
        <div>
            <h2>Tutors</h2>
            <ul>
                {tutors.map(tutor => (
                    <li key={tutor.tutor_id}>
                        <p>Name: {tutor.first_name} {tutor.last_name}</p>
                        <p>Email: {tutor.email}</p>
                        <p>Phone: {tutor.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tutors;
