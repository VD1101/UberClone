import React, { useEffect } from 'react'


const LocationSerchPanel = ({setPanelOpen,setVehiclePanelOpen,suggestions, setPickup, setDestination, activeField}) => {
    
    const handleSuggestionClick = (suggestion) =>{
        if(activeField==='pickup'){
            setPickup(suggestion)
        }
        else if(activeField==='destination'){
            setDestination(suggestion)
            // setPanelOpen(false)
            // setVehiclePanelOpen(true)
        }
    }

    return (

        <div className="w-full pt-4 align-middle items-center flex flex-col gap-2 justify-center ">
            {
                suggestions.map((location,idx) => {
                    return (
                        <div  key={idx} onClick={()=>{handleSuggestionClick(location)}} className='flex  w-[90%] px-4  items-center gap-6 border-[#dbd9d9] active:border-black py-3 border-2 rounded-lg' >
                            <h2 className='text-xl font-bold bg-[#eee] px-3 py-2 rounded-full '><i className="ri-map-pin-line"></i></h2>
                            <h4 className='font-medium '>{location}</h4>
                        </div>

                    )
                })
            }

        </div>
    )
}

export default LocationSerchPanel