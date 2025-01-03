import React from 'react'

const ConfirmRide = ({setConfirmRidePanelOpen,setLookingForRideOpen,pickup,destination,fare,createRide,setVehiclePanelOpen}) => {
    return (
        <div className='w-screen flex flex-col justify-center items-center'>
            <div onClick={()=>{setConfirmRidePanelOpen(false)}} className='bg-[#797979] rounded-full w-20 mt-3 active:bg-black h-[4px]'></div>
            <h1 className='text-xl  pt-2 mb-5 pl-2 inline-block text-center'>Confirm your ride</h1>
            <img src="/images/confirm.png" alt="" className='w-[65%] mb-2' />
            <div className='w-full border-t-[1px] border-[#efeaea] flex flex-col object-fill'>
                <div className='w-full flex gap-5 items-center px-5'>
                    <i className="ri-map-pin-3-fill"></i>
                    <div className='border-b-[1px] w-full py-3'>
                        <h2 className='font-bold text-xl'>DDSA-1011</h2>
                        <p className='text-[#797979]'>{pickup}</p>
                    </div>
                </div>
                <div className='w-full flex gap-5 items-center px-5'>
                    <i className="ri-square-fill"></i>
                    <div className='border-b-[1px] w-full py-3'>
                        <h2 className='font-bold text-xl'>DDSA-1011</h2>
                        <p className='text-[#797979]'>{destination}</p>
                    </div>
                </div>
                <div className='w-full flex gap-5 items-center px-5'>
                    <i className="ri-bank-card-fill"></i>
                    <div className='border-b-[1px] w-full py-3'>
                        <h2 className='font-bold text-xl'>	
                        &#36; {fare}</h2>
                        <p className='text-[#797979]'>Cash or Online</p>
                    </div>
                </div>
                <button onClick={()=>{setConfirmRidePanelOpen(false),setVehiclePanelOpen(false),setLookingForRideOpen(true),createRide()}} className='bg-black inline-block tracking-widest w-ful text-white text-center py-3 text-xl my-5 rounded-lg w-[95%] fixed bottom-0 right-2 '>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide