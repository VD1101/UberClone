import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <>
      <div className='h-screen w-screen flex flex-col'>
        <div className='h-[80%] w-full bg-[url("./images/home.png")] bg-cover bg-no-repeat bg-center'>
          <img className="h-[8%] m-4 p-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="user-logo" />
        </div>
        <div className='bg-white h-[20%] w-full p-3 flex flex-col justify-around' >
          <h2 className='text-3xl font-medium'>Get Started with Uber</h2>
          <Link to={"/login"} className='inline-block text-2xl bg-black text-white tracking-widest p-2 w-full text-center rounded-lg'>Continue</Link>
        </div>
      </div>
    </>
  )
}

export default Start