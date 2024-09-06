import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/forgot-password', { email });
            alert('Password reset link sent to your email');
        } catch (error) {
            console.error('Password reset failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8,
                    padding: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Forgot Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 0', fontSize: '16px' }}
                    >
                        Send Reset Link
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
