import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import FinishRide from '../componants/FinishRide';
import { Link ,useLocation} from 'react-router-dom';
import LiveTracking from '../componants/LiveTraker';

const StartRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishPanelRef = useRef();
  const location = useLocation()
  const ride = location.state?.ride;
  useEffect(() => {
    gsap.to(finishPanelRef.current, {
      transform: finishRidePanel ? 'translateY(0)' : 'translateY(150%)',
      duration : .7,
      ease : 'power1'
    })
  })

  console.log(ride)

  return (
    <div className='h-screen w-screen relative'>
      <div className='absolute flex justify-between items-center w-full'>
        <img className="w-20 ml-5 mt-5 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="user-logo" />
      </div>
      <div className='w-full h-[80%]' >
        {/* <div className='bg-yellow-400 h-full w-full' ></div> */}
        <LiveTracking/>
      </div>
      <div className='absolute w-full h-[20%]'>
        <div className='flex flex-col items-center gap-3 bg-[#eeeee] h-full'>
          <i onClick={() => { setFinishRidePanel(true) }} className="ri-arrow-up-wide-fill font-bold text-2xl"></i>
          <h2 className='font-medium text-2xl'>{ride?.distance/1000} Km</h2>
        </div>
      </div>
      <div ref={finishPanelRef} className='bg-white fixed h-[85%] bottom-0 w-screen translate-y-[150%] rounded-t-lg'>
        <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default StartRiding