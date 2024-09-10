import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const IncidentDetail = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [incident, setIncident] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    // Fetch incident details on mount
    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await api.get(`/home/incident/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.jwtToken}`
                    }
                });
                setIncident(response.data);
                setDetails(response.data.details);
                setPriority(response.data.priority);
                setStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching incident:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                    alert('Failed to fetch incident details');
                }
            }
        };

        fetchIncident();
    }, [id, auth.jwtToken, navigate]);

    // Function to toggle edit mode
    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    // Function to handle delete
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this incident?')) {
            try {
                await api.delete(`/home/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.jwtToken}`
                    }
                });
                alert('Incident deleted successfully');
                navigate('/incidents'); // Redirect to incidents list after deletion
            } catch (error) {
                console.error('Error deleting incident:', error);
                alert('Failed to delete incident');
            }
        }
    };

    // Function to handle save after editing
    const handleSave = async () => {
        try {
            const response = await api.put(`/home/update/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${auth.jwtToken}`
                },
                params: {
                    details: details,
                    priority: priority,
                    status: status
                }
            });
            setIncident(response.data); // Update the incident details
            setEditMode(false); // Exit edit mode
            alert('Incident updated successfully');
        } catch (error) {
            console.error('Error updating incident:', error);
            alert('Failed to update incident');
        }
    };

    if (!incident) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Incident Details</h2>
            {editMode ? (
                <div>
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                    <input
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        placeholder="Priority"
                    />
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Status"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p><strong>Details:</strong> {incident.details}</p>
                    <p><strong>Priority:</strong> {incident.priority}</p>
                    <p><strong>Status:</strong> {incident.status}</p>
                    <button onClick={handleEditToggle}>Edit</button>
                </div>
            )}
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default IncidentDetail;
