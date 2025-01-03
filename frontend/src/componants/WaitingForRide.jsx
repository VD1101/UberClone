import React from 'react'

const WaitingForRide = ({ setLookingForRideOpen,waitingForRideOpen,ride}) => {
    if(waitingForRideOpen){
        setLookingForRideOpen(false);
    }
    return (
        <div className='w-screen flex flex-col justify-center items-center'>
            <h1 className='text-xl py-3 text-center w-full font-medium border-b-[1px] border-[#efeaea]'>Ride Confirm!</h1>
            <div className='flex my-3 rounded-lg text-center justify-around items-center gap-3 w-[90%] mx-auto'>
                <img alt="Ride" className="w-[30%]" src="https://mobile-content.uber.com/launch-experience/ride.png" />
                <div className='flex flex-col justify-center items-end w-[40%]'>
                    <div className="font-medium text-lg">{ride?.captain?.fullname.firstname} {ride?.captain?.fullname.lastname}</div>
                    <div className="font-medium text-xl">{ride?.captain?.vehicle.numberPlate}</div>
                    <div className="font-medium text-sm text-[#4b4b4b]">{ride?.captain?.vehicle.vehicleType}</div>
                </div>
            </div>
            <div className='py-2 my-2'>
                <h1 className='text-2xl'>Your OTP : <span className='font-bold '>{ride?.otp}</span></h1>
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
        </div>
    )
}

export default WaitingForRide