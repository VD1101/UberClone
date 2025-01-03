import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
        const logoutCaptain = async()=>{
            try {
                const response = await axios.get('http://localhost:4000/captains/logout', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {

                    localStorage.removeItem('token'); // Clear invalid token
                    navigate('/captain-login');
                }
            }
        }
        logoutCaptain();
    },[navigate,token]);
    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout