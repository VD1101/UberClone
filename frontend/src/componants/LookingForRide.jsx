import React from 'react'

const LookingForRide = ({fare,pickup,destination}) => {
    return (
        <div className='w-screen flex flex-col justify-center items-center'>
            <h1 className='text-xl pt-2 mb-5 font-medium'>Looking for nearby drivers</h1>
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
            </div>
        </div>
    )
}

export default LookingForRide