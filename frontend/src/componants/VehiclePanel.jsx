import React from 'react'

const VehiclePanel = ({setVehiclePanelOpen,setConfirmRidePanelOpen,fare,setVehicleType}) => {
    

    return (
        <div >
            <div className='flex items-center justify-between'>
                <h2 className='text-3xl font-medium pt-5 mb-5 pl-2 inline-block'>Choose a Vehicle</h2>
                <i className="ri-arrow-down-wide-fill text-[#dbd9d9] text-3xl font-bold mr-7 mt-2" onClick={() => { setVehiclePanelOpen(false) }}></i>
            </div>
            <div onClick={()=>{setConfirmRidePanelOpen(true) ,setVehicleType('car')}} className='flex border-[#dbd9d9] active:border-black my-3 border-2 rounded-lg text-center justify-center items-center gap-3 w-[90%] mx-auto'>
                <img alt="Ride" className="w-[30%]" src="https://mobile-content.uber.com/launch-experience/ride.png" />
                <div className='flex flex-col justify-center items-start w-[40%]'>
                    <div className="font-medium text-lg">UberGo <span><i className="ri-user-3-fill"></i></span>4</div>
                    <div className="font-medium text-sm">2 mins away</div>
                    <div className=" text-start font-medium text-xs text-[#4b4b4b]">Affordable compact rides</div>
                </div>
                <h2 className='font-bold'>
                    &#36;{fare.car}</h2>
            </div>
            <div onClick={()=>{setConfirmRidePanelOpen(true),setVehicleType('moto')}} className='flex border-[#dbd9d9] active:border-black  my-3 border-2 rounded-lg text-center justify-center items-center gap-3 w-[90%] mx-auto'>
                <img alt="Moto" className="w-[30%]" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/xmas_Moto.png" />
                <div className='flex flex-col justify-center items-start w-[40%]'>
                    <div className="font-medium text-lg">Moto <span><i className="ri-user-3-fill"></i></span>1</div>
                    <div className="font-medium text-sm">3 mins away</div>
                    <div className="  text-start font-medium text-xs text-[#4b4b4b]">Affordable, motorcycle rides</div>
                </div>
                <h2 className='font-bold'>
                    &#36;{fare.moto}</h2>
            </div>
            <div onClick={()=>{setConfirmRidePanelOpen(true),setVehicleType('auto')}} className='flex border-[#dbd9d9] active:border-black my-3 border-2 rounded-lg text-center justify-center items-center gap-3 w-[90%] mx-auto'>
                <img alt="Uber Auto" className="w-[30%]" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/xmas_TukTuk.png" />
                <div className='flex flex-col justify-center items-start w-[40%]'>
                    <div className="font-medium text-lg">UberAuto <span><i className="ri-user-3-fill"></i></span>3</div>
                    <div className="font-medium text-sm">3 mins away</div>
                    <div className=" text-start font-medium text-xs text-[#4b4b4b]">No bargaining, doorstep pick-up</div>
                </div>
                <h2 className='font-bold'>
                    &#36;{fare.auto}</h2>
            </div>

        </div>
    )
}

export default VehiclePanel