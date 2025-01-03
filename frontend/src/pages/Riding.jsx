import React from 'react'
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../componants/LiveTraker';

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const ride = location.state?.ride;

  socket.on('ride-ended', () => {
    navigate('/user-home')
  })
  return (
    <div className='h-screen w-screen'>
      <div className='flex justify-between items-center h-[10%] px-2 w-full'>
        <img className="w-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="user-logo" />
        <i className="ri-user-6-fill pr-3"></i>
      </div>
      <div className='h-[55%]'>
        <LiveTracking />
      </div>

      <div className='w-screen flex flex-col justify-center items-center'>
        <div className='flex mt-2 text-center justify-around items-center gap-3 w-[90%]  mx-auto'>
          <img alt="Ride" className="w-[30%]" src="https://mobile-content.uber.com/launch-experience/ride.png" />
          <div className='flex flex-col justify-center items-end w-[40%]'>
            <div className="font-medium text-lg capitalize">{ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</div>
            <div className="font-medium text-xl">VD-1101</div>
            <div className=" text-start font-medium text-sm text-[#4b4b4b]">{ride?.captain.vehicle.vehicleType}</div>
          </div>
        </div>
        <div className='w-full border-t-[1px] border-[#efeaea] flex flex-col object-fill'>
          <div className='w-full flex gap-5 items-center px-5'>
            <i className="ri-map-pin-3-fill"></i>
            <div className='border-b-[1px] w-full py-2'>
              <h2 className='font-bold text-xl'>DDSA-1011</h2>
              <p className='text-[#797979]'>{ride?.destination}</p>
            </div>
          </div>
          <div className='w-full flex gap-5 items-center px-5'>
            <i className="ri-bank-card-fill"></i>
            <div className='w-full py-2'>
              <h2 className='font-bold text-xl'>
                &#36; {ride?.fare}</h2>
              <p className='text-[#797979]'>Cash or Online</p>
            </div>
          </div>
        </div>
      </div>
      <button className='bg-black inline-block tracking-widest w-ful text-white text-center py-3 text-xl my-5 rounded-lg w-[95%] fixed bottom-0 right-2 '>Make a Payment</button>
    </div>
  )
}

export default Riding