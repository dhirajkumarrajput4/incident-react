import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { api } from '../../services/api';



function ForgotPassword() {
    const [emailId, setEmailId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.get('/auth/forgot-password', {
                params: {
                    emailId
                }
            });
            alert('Password reset link sent to your email');
        } catch (error) {
            console.error('Password reset failed', error);
            alert('Failed to send password reset link. Please try again.');
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
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
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
