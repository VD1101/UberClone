import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';



const CaptainSignup = () => {
    const [data, setData] = useState({ fullname: { firstname: '', lastname: '', }, email: '', password: '', vehicle: { vehicleType: 'car', numberPlate: '', color: '', capacity: 1 } });

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);

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
        } else if (name === "vehicleType" || name === "numberPlate" || name === "color" || name === "capacity") {
            setData({
                ...data,
                vehicle: {
                    ...data.vehicle,
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
        const captainData = {
            fullname: {
                firstname: data.fullname.firstname,
                lastname: data.fullname.lastname,
            },
            email: data.email,
            password: data.password,
            vehicle: {
                vehicleType: data.vehicle.vehicleType,
                numberPlate: data.vehicle.numberPlate,
                color: data.vehicle.color,
                capacity: data.vehicle.capacity
            }
        }
        const response = await axios.post("http://localhost:4000/captains/register", captainData);
        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        console.log(captainData);
        setData({ fullname: { firstname: '', lastname: '' }, email: '', password: '', vehicle: { vehicleType: 'car', numberPlate: '', color: '', capacity: 0 } });

    }
    return (
        <div>
            <div className='p-7 min-h-max flex flex-col justify-between lg:w-1/2 lg:mx-auto'>
                <div>
                    <img
                        className="w-20 mb-10 lg:mx-0"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                        alt="user-logo"
                    />
                    <form action="" className='mt-5' onSubmit={submitHandler}>
                        <div className="user-info mt-2">
                            <h2 className='text-3xl mb-2 mt-3 text-center lg:text-left '>User details</h2>
                            <hr className="mb-3" />
                            <div className="lg:flex lg:gap-4">
                                <div className="lg:w-1/2">
                                    <h3 className='text-xl mb-2 mt-3'>Firstname</h3>
                                    <input
                                        onChange={handelChange}
                                        name="firstname"
                                        value={data.fullname.firstname}
                                        className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                        type="text"
                                        required
                                        placeholder='First name'
                                    />
                                </div>
                                <div className="lg:w-1/2">
                                    <h3 className='text-xl mb-2 mt-3'>Lastname</h3>
                                    <input
                                        onChange={handelChange}
                                        name="lastname"
                                        value={data.fullname.lastname}
                                        className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                        type="text"
                                        required
                                        placeholder='Last name'
                                    />
                                </div>
                            </div>

                            <h3 className='text-xl mb-2 mt-3'>Email</h3>
                            <input
                                onChange={handelChange}
                                name="email"
                                value={data.email}
                                className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                type="email"
                                required
                                placeholder='email@example.com'
                            />

                            <h3 className='text-xl mb-2 mt-3'>Password</h3>
                            <input
                                onChange={handelChange}
                                name="password"
                                value={data.password}
                                className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                type="password"
                                required
                                placeholder='password'
                            />
                        </div>

                        <div className="vehicle-info mt-10">
                            <h2 className='text-3xl mb-2 mt-3 text-center lg:text-left'>Vehicle details</h2>
                            <hr className="mb-3" />

                            <h3 className='text-xl mb-2 mt-3'>Vehicle type</h3>
                            <label htmlFor="vehicleType" className='text-xl mb-2 mt-3'></label>
                            <select
                                name="vehicleType"
                                className='text-start bg-[#eeeeee] p-3 w-full border rounded-md'
                                onChange={handelChange}
                                value={data.vehicle.vehicleType}
                                id="vehicleType"
                            >
                                <option value="car">CAR</option>
                                <option value="motorcycle">MOTORCYCLE</option>
                                <option value="auto">AUTO</option>
                            </select>

                            <h3 className='text-xl mb-2 mt-3'>Registered number plate</h3>
                            <input
                                onChange={handelChange}
                                name="numberPlate"
                                value={data.vehicle.numberPlate}
                                className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                type="text"
                                required
                                placeholder='Number Plate'
                            />

                            <h3 className='text-xl mb-2 mt-3'>Vehicle color</h3>
                            <input
                                onChange={handelChange}
                                name="color"
                                value={data.vehicle.color}
                                className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                type="text"
                                required
                                placeholder='Enter your vehicle color'
                            />

                            <h3 className='text-xl mb-2 mt-3'>Capacity</h3>
                            <input
                                onChange={handelChange}
                                name="capacity"
                                value={data.vehicle.capacity}
                                className='bg-[#eeeeee] p-3 w-full border rounded-md'
                                type="number"
                                required
                                min="1"
                                max="10"
                            />
                        </div>

                        <button className='mt-5 bg-black text-white w-full py-3 text-xl tracking-widest rounded-lg'>
                            Create account
                        </button>
                    </form>
                    <p className='mt-3 text-center'>
                        Already have an account?{' '}
                        <Link to={"/captain-login"} className='text-[#1A72E8]'>
                            login
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default CaptainSignup