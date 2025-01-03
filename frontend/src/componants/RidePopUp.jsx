import React from 'react'

const RidePopUp = ({ setRidePopUpPanel ,setRideConfirmOtpPanel,ride,confirmRide}) => {
    return (
        <div className='w-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl  pt-2 pl-2 font-medium inline-block text-center'>New Ride Available!</h1>
            <div className='flex mx-2 items-center justify-around gap-4 my-2 px-2 py-5 bg-gray-200 rounded-lg'>
                <div className='flex gap-2 items-center'>
                    <img src="/images/userphoto.png" alt="" className='rounded-full w-[15%]' />
                    <h2 className='text-2xl font-bold capitalize'>{ride?.user.fullname.firstname} {ride?.user.fullname.lastname}</h2>
                </div>
                <div>
                    <h2 className='font-medium text-lg mr-2'>{(ride?.distance/1000).toFixed(2)}&nbsp;Km</h2>
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
            <div className='flex flex-col w-full items-center fixed bottom-0'>
                <button onClick={() => {
                    setRidePopUpPanel(false)
                }} className='bg-black inline-block tracking-widest w-ful text-white text-center py-3  text-xl rounded-lg w-[95%] '>Ignore</button>
                <button onClick={()=>{
                    // setRidePopUpPanel(false)
                    // setRideConfirmOtpPanel(true),
                    confirmRide();
                }} className='bg-[#03c35b]  inline-block tracking-widest w-ful text-white text-center  my-2 py-3 text-xl rounded-lg w-[95%]  '>Confirm</button>
            </div>
        </div>
    )
}

export default RidePopUp