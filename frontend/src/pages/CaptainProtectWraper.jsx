import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWraper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoding, setIsLoding] = useState(true);

    useEffect(() => {

        if (!token) {
            navigate('/captain-login');
        }
        axios.get("http://localhost:4000/captains/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain);
                setIsLoding(false);
            }
        }).catch((err) => {
            console.log(err);
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
        
    }, [ token]);

    
    if (isLoding) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWraper