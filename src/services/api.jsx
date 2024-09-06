// services/api.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Replace with your API base URL
});

// Function to add token to headers
const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export { api, setAuthToken };
