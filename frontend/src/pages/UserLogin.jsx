import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserLogin = () => {
    const [data, setData] = useState({ email: '', password: '' });

    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();


    const handelChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value });

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email: data.email,
            password: data.password
        }
        const response = await axios.post("http://localhost:4000/users/login", userData);

        if (response.status === 200) {
            const data = response.data;
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/user-home');
        }



        setData({ email: '', password: '' });

    }

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-between p-4">
            <img
                className="h-[8%] max-w-[200px] p-2 mr-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                alt="user-logo"
            />
            <div className="h-[80%] w-full p-4 flex flex-col justify-between max-w-md">
                <form action="" className="" onSubmit={submitHandler}>
                    <h3 className="text-xl mb-2 font-medium sm:text-lg">What's your email?</h3>
                    <input
                        onChange={handelChange}
                        name="email"
                        value={data.email}
                        className="bg-[#eeeeee] p-3 w-full border rounded-md text-sm sm:p-2"
                        type="email"
                        required
                        placeholder="email@example.com"
                    />
                    <h3 className="text-xl mb-2 mt-5 font-medium sm:text-lg">Enter Password</h3>
                    <input
                        onChange={handelChange}
                        name="password"
                        value={data.password}
                        className="bg-[#eeeeee] p-3 w-full border rounded-md text-sm sm:p-2"
                        type="password"
                        required
                        placeholder="password"
                    />
                    <button className="bg-black text-white py-3 my-4 w-full tracking-wider text-xl rounded-lg sm:py-2 sm:text-lg">
                        Login
                    </button>
                </form>
                <p className="text-center text-xl sm:text-lg">
                    New here?{" "}
                    <Link to={"/signup"} className="text-[#1A72E8]">
                        Create new account
                    </Link>
                </p>
            </div>
            <Link
                to={"/captain-login"}
                className="bg-[#03c35b] inline-block tracking-widest w-[90%] rounded-lg text-center text-2xl py-2 max-w-md sm:text-lg sm:py-1"
            >
                Login as Captain
            </Link>
        </div>


    )
}

export default UserLogin