import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
const CaptainDetails = () => {
    const { captain,setCaptain } = useContext(CaptainDataContext);
    const updateState = async()=>{
        await axios.get('http://localhost:4000/captains/update-status',{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response)=>{
            setCaptain(response.data.captain);
        })
    }
    return (
        <div>
            <div className='flex w-full items-center gap-4 p-2'>
                <img src="/images/userphoto.png" alt="" className='rounded-full w-[15%]' />
                <h2 className='text-2xl font-bold capitalize'>{`${captain.fullname.firstname} + ${captain.fullname.lastname}`}</h2>
                <div class="flex items-center space-x-4 flex-col">
                    <span class="text-gray-700 font-medium">Status</span>
                    <label class="relative inline-block w-12 h-6">
                        <input type="checkbox" class="peer hidden"  onChange={()=>{updateState()}}/>
                        <span
                            class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-blue-600 peer-checked:before:translate-x-6 before:content-[''] before:absolute before:w-6 before:h-6 before:bg-white before:rounded-full before:shadow-md before:transition before:duration-300"
                        ></span>
                    </label>
                </div>

            </div>
            <div className='bg-[#e7e7e7] flex items-center justify-center gap-10 mt-2 w-[95%] mx-auto rounded-lg px-1 py-4'>
                <div className='flex flex-col gap-1 justify-center items-center '>
                    <i className="ri-time-line text-2xl"></i>
                    <h3 className='font-bold text-2xl'>12</h3>
                    <h4 className='text-sm text-gray-500'>Time Online</h4>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center '>
                    <i className="ri-money-dollar-circle-fill text-2xl"></i>
                    <h3 className='font-bold text-2xl'>120 &#x24;</h3>
                    <h4 className='text-sm text-gray-500'>Today's Earning</h4>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center '>
                    <i className="ri-taxi-line text-2xl"></i>
                    <h3 className='font-bold text-2xl'>8</h3>
                    <h4 className='text-sm text-gray-500'>Total Ride</h4>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails