import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users/logout', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {

                    localStorage.removeItem('token'); // Clear invalid token
                    navigate('/login');
                }
            }
        };

        logoutUser();
    }, [token, navigate]);

    return <div>Logging out...</div>;
};

export default UserLogout;
