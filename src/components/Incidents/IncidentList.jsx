import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api, setAuthToken } from '../../services/api';

function IncidentList() {
    const [incidents, setIncidents] = useState([]);
    const { auth } = useAuth(); // Get auth from context

    useEffect(() => {
        // Set the token in the API service
        setAuthToken(auth.jwtToken);

        const fetchIncidents = async () => {
            try {
                // Replace with your backend incidents endpoint
                const response = await api.get('/home/incidents');
                setIncidents(response.data);
            } catch (error) {
                console.error('Failed to fetch incidents', error);
            }
        };

        fetchIncidents();
    }, [auth.jwtToken]); // Add auth.jwtToken as a dependency

    return (
        <div>
            <h2>Incidents</h2>
            <ul>
                {incidents.map((incident) => (
                    <li key={incident.id}>
                        <a href={`/incident/${incident.id}`}>{incident.details}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IncidentList;
