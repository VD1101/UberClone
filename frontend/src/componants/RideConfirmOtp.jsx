import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RideConfirmOtp = ({ ride }) => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState(0);

    const onchangeOpt = (e) => {
        setOtp(e.target.value)
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await axios.get('http://localhost:4000/rides/start-ride',
            {
                params: {
                    rideId: ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        if (response.status === 200) {
            navigate('/captain-riding',{state : {ride : ride}});
        }

    }
    return (
        <div className='w-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl  pt-2 pl-2 font-medium inline-block text-center'>Enter an OPT</h1>
            <div className='flex mx-2 items-center justify-around gap-4 my-2 px-2 py-5 bg-gray-200 rounded-lg'>
                <div className='flex gap-2 items-center'>
                    <img src="/images/userphoto.png" alt="" className='rounded-full w-[15%]' />
                    <h2 className='text-2xl font-bold capitalize'>{ride?.user.fullname.firstname} {ride?.user.fullname.lastname}</h2>
                </div>
                <div>
                    <h2 className='font-medium text-lg mr-2'>{ride?.distance / 1000}&nbsp;Km</h2>
                </div>
            </div>
            <div className='w-full border-t-[1px] border-[#efeaea] flex flex-col object-fill'>
                <div className='w-full flex gap-5 items-center px-5'>
                    <i className="ri-map-pin-3-fill"></i>
                    <div className='border-b-[1px] w-full py-3'>
                        <h2 className='font-bold text-xl'>DDSA-1011</h2>
                        <p className='text-[#797979]'>{ride?.pickup}</p>
                    </div>
                </div>
                <div className='w-full flex gap-5 items-center px-5'>
                    <i className="ri-square-fill"></i>
                    <div className='border-b-[1px] w-full py-3'>
                        <h2 className='font-bold text-xl'>DDSA-1011</h2>
                        <p className='text-[#797979]'>{ride?.destination}</p>
                    </div>
                </div>
                <div className='w-full flex gap-5 items-center px-5'>
                    <i className="ri-bank-card-fill"></i>
                    <div className='border-b-[1px] w-full py-3'>
                        <h2 className='font-bold text-xl'>
                            &#36; {ride?.fare}</h2>
                        <p className='text-[#797979]'>Cash or Online</p>
                    </div>
                </div>
            </div>
            <form onSubmit={submitHandler} className='pl-6 py-2  w-full'>
                <h2 className='text-lg font-medium my-1'>Start the Ride</h2>
                <input onChange={onchangeOpt} value={otp}  type="number" className='font-mono border ml-2 border-black rounded-lg p-2 w-[90%]' placeholder='Enter OTP' />
                {otp.length === 6 ? (
                    <button
                        type='submit'
                        className='bg-black inline-block tracking-widest w-ful text-white text-center py-3 text-xl mt-3 rounded-lg w-[95%]'
                    >
                        Start Ride
                    </button>
                ) : (
                    <div
                        className='bg-gray-400 inline-block tracking-widest w-ful text-white text-center py-3 text-xl mt-3 rounded-lg w-[95%] cursor-not-allowed'
                    >
                        Start Ride
                    </div>
                )}
            </form>
        </div>
    )
}

export default RideConfirmOtp