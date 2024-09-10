import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function IncidentForm() {
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState('Medium');
    const navigate = useNavigate();  // Use useNavigate here
    const { auth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/home/create', null, {
                headers: {
                    Authorization: `Bearer ${auth.jwtToken}`
                },
                params: {
                    details, 
                    priority
                }
            });
            
            console.log('Incident created:', response.data);
            navigate('/incidents');  // Redirect to incidents list after creation
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
