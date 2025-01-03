import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
    const [data, setData] = useState({ fullname: { firstname: '', lastname: '' }, email: '', password: '' });
    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate()

    const handelChange = (e) => {
        const { name, value } = e.target;

        if (name === "firstname" || name === "lastname") {
            setData({
                ...data,
                fullname: {
                    ...data.fullname,
                    [name]: value,
                },
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            fullname: {
                firstname: data.fullname.firstname,
                lastname: data.fullname.lastname,
            },
            email: data.email,
            password: data.password,
        }


        const response = await axios.post("http://localhost:4000/users/register", userData);

        if (response.status === 201) {
            const data = response.data;
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/user-home');
        }

        setData({ email: '', password: '', fullname: { firstname: '', lastname: '' } });

    }
    return (
        <div className="p-5 h-screen flex flex-col justify-between bg-gray-50">
            <div className="max-w-md mx-auto w-full">
                <img
                    className="w-20 mb-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                    alt="user-logo"
                />
                <form
                    action=""
                    className="mt-5 bg-white p-6 rounded-lg shadow-md"
                    onSubmit={submitHandler}
                >
                    <h3 className="text-xl mb-2 mt-3 font-medium">Firstname</h3>
                    <input
                        onChange={handelChange}
                        name="firstname"
                        value={data.fullname.firstname}
                        className="bg-[#eeeeee] p-3 w-full border rounded-md"
                        type="text"
                        required
                        placeholder="First name"
                    />
                    <h3 className="text-xl mb-2 mt-3 font-medium">Lastname</h3>
                    <input
                        onChange={handelChange}
                        name="lastname"
                        value={data.fullname.lastname}
                        className="bg-[#eeeeee] p-3 w-full border rounded-md"
                        type="text"
                        required
                        placeholder="Last name"
                    />
                    <h3 className="text-xl mb-2 mt-3 font-medium">Email</h3>
                    <input
                        onChange={handelChange}
                        name="email"
                        value={data.email}
                        className="bg-[#eeeeee] p-3 w-full border rounded-md"
                        type="email"
                        required
                        placeholder="email@example.com"
                    />
                    <h3 className="text-xl mb-2 mt-3 font-medium">Password</h3>
                    <input
                        onChange={handelChange}
                        name="password"
                        value={data.password}
                        className="bg-[#eeeeee] p-3 w-full border rounded-md"
                        type="password"
                        required
                        placeholder="password"
                    />
                    <button className="mt-5 bg-black text-white w-full py-3 text-xl tracking-widest rounded-lg hover:bg-gray-800 transition">
                        Create account
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#1A72E8] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserSignup