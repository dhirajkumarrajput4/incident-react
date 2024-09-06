import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import ForgotPassword from './components/Auth/ForgotPassword';
import IncidentList from './components/Incidents/IncidentList';
import IncidentForm from './components/Incidents/IncidentForm';
import { AuthProvider } from './context/AuthContext'; // Import AuthContext
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route path="/incidents" element={<PrivateRoute element={<IncidentList />} />} />
                    <Route path="/create-incident" element={<PrivateRoute element={<IncidentForm />} />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
