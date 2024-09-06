import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests
import { api, setAuthToken } from '../../services/api';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState(''); // State for password field
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Fetch city and country based on pin code using Zippopotam.us API
    const handlePinCodeChange = async (e) => {
        const pin = e.target.value;
        setPinCode(pin);

        if (pin.length === 6) {
            try {
                // Replace 'IN' with the appropriate country code if required
                const response = await axios.get(`https://api.zippopotam.us/IN/${pin}`);
                const place = response.data.places[0];
                
                setCity(place['place name']);
                setCountry(response.data.country);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching location data:', error);
                setErrorMessage('Invalid pin code or no data found.');
                setCity('');
                setCountry('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, phoneNumber, address, pinCode, city, country, password };
            const response = await api.post('/auth/register', userData);
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="User Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <TextField
                        label="Pin Code"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={pinCode}
                        onChange={handlePinCodeChange}
                        required
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={city}
                        disabled // Auto-filled from pin code
                    />
                    <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={country}
                        disabled // Auto-filled from pin code
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default Registration;
