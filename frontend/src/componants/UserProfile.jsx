import React,{useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';

const UserProfile = ({setUserProfilePanelOpen,userProfilePanelOpen}) => {
    const {user} = useContext(UserDataContext);

    return (
        <div className='w-screen h-screen relative'>
            <div className='flex justify-between items-center w-full'>
                <img className="w-20 ml-5 mt-5 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="user-logo" />
                <i onClick={() => {
                    setUserProfilePanelOpen(!userProfilePanelOpen)
                }} className="ri-close-large-fill font-medium  mr-5 mt-5 text-2xl z-12 bg-black text-white rounded-full px-3 py-2"></i>
            </div>
            <div className='flex flex-col justify-center items-start p-5 mt-5 border-t-2'>
                <h2 className='text-2xl my-3 font-medium  '>Username : <span className='text-[#868585]'>{user.fullname.firstname} {user.fullname.lastname}</span></h2>
                <h2 className='text-2xl my-3 font-medium '>Email : <span className='text-[#868585]'>{user.email}</span></h2>
            </div>
            <Link to={"/user/logout"} className='bg-[#000000]  absolute bottom-4 left-2  inline-block tracking-widest w-[95%] text-white text-center py-3 text-xl   rounded-lg'>LogOut</Link>

        </div>
    )
}


export default UserProfile