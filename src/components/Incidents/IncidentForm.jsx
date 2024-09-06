import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api, setAuthToken } from '../../services/api';

function IncidentForm() {
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState('Medium');
    const navigate = useNavigate();  // Use useNavigate here

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/home/create', { details, priority });
            // Assuming response contains the incident information
            console.log('Incident created:', response.data);
            navigate('/incidents');  // Use navigate for redirection
        } catch (error) {
            console.error('Failed to create incident', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>Create Incident</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Details"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                    <TextField
                        label="Priority"
                        select
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Create Incident
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default IncidentForm;
