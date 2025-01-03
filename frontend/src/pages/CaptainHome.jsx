import React, { useContext, useEffect, useRef, useState } from 'react'
import CaptainDetails from '../componants/CaptainDetails'
import RidePopUp from '../componants/RidePopUp'
import gsap from 'gsap';
import RideConfirmOtp from '../componants/RideConfirmOtp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from "axios";
import LiveTracking from '../componants/LiveTraker';

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [rideConfirmOtpPanel, setRideConfirmOtpPanel] = useState(false);

  const ridePopUpRef = useRef(null);
  const rideConfirmOtp = useRef(null);

  const [ride, setRide] = useState(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);



  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
  })

  // console.log(ride);


  socket.on('new-ride', (data) => {

    setRide(data)
    setRidePopUpPanel(true)
    // setRideConfirmOtpPanel(false)

  })

  async function confirmRide() {

    const response = await axios.post(`http://localhost:4000/rides/confirm`, {

      rideId: ride._id,

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data);

    setRidePopUpPanel(false);
    setRideConfirmOtpPanel(true);

  }

  useEffect(() => {
    gsap.to(ridePopUpRef.current, {
      transform: ridePopUpPanel ? 'translateY(0)' : 'translateY(150%)',
    })
    gsap.to(rideConfirmOtp.current, {
      transform: rideConfirmOtpPanel ? 'translateY(0)' : 'translateY(150%)',
    })
  }, [ridePopUpPanel, rideConfirmOtpPanel]);


  console.log(captain);





  return (
    <div className=' h-screen w-screen'>
      <div className='flex justify-between items-center h-[10%] px-2 w-full'>
        <img className="w-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="user-logo" />
        <i className="ri-user-6-fill pr-3"></i>
      </div>
      <div className='h-[55%]'>
        <LiveTracking />
      </div>
      <div className=' py-2'>
        <CaptainDetails />
      </div>
      <div ref={ridePopUpRef} className='bg-white fixed h-full bottom-0 w-screen translate-y-[150%] rounded-t-lg'>
        <RidePopUp ride={ride} confirmRide={confirmRide} setRidePopUpPanel={setRidePopUpPanel} setRideConfirmOtpPanel={setRideConfirmOtpPanel} />
      </div>
      <div ref={rideConfirmOtp} className='bg-white fixed  bottom-0 w-screen translate-y-[150%] rounded-t-lg'>
        <RideConfirmOtp ride={ride} />
      </div>

    </div>



  )
}

export default CaptainHome