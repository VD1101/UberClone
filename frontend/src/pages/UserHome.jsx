import React, { useRef, useState, useEffect, useContext } from 'react';
import gsap from 'gsap';
import LocationSerchPanel from '../componants/LocationSerchPanel';
import VehiclePanel from '../componants/VehiclePanel';
import ConfirmRide from '../componants/ConfirmRide';
import LookingForRide from '../componants/LookingForRide';
import WaitingForRide from '../componants/WaitingForRide';
import UserProfile from '../componants/UserProfile';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../componants/LiveTraker';




const UserHome = () => {

  // const navigate = useNavigate();

  // const [pickup, setPickup] = useState('');
  // const [destination, setDestination] = useState('');
  // const [panelOpen, setPanelOpen] = useState(false);
  // const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  // const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  // const [lookingForRideOpen, setLookingForRideOpen] = useState(false);
  // const [waitingForRideOpen, setWaitingForRideOpen] = useState(false);
  // const [userProfilePanelOpen, setUserProfilePanelOpen] = useState(false);
  // const [pickupSuggestions, setPickupSuggestions] = useState([]);
  // const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  // const [activeField, setActiveField] = useState([]);
  // const [fare, setFare] = useState({});
  // const [vehicleType, setVehicleType] = useState(null);
  // const [ride, setRide] = useState(null);

  // const { socket } = useContext(SocketContext);
  // const { user } = useContext(UserDataContext);

  // const trackerRef = useRef(null)
  // const panelRef = useRef(null);
  // const iconRef = useRef(null);
  // const headingRef = useRef(null);
  // const locationPanelRef = useRef(null);
  // const vehiclepanelRef = useRef(null);
  // const ConfirmRideRef = useRef(null);
  // const lookingForRideRef = useRef(null);
  // const waitingForRideRef = useRef(null);
  // const userProfilePanelRef = useRef(null);


  // useEffect(() => {
  //   socket.emit('join', { userType: "user", userId: user._id });
  // }, [user])



  // socket.on('ride-confirmed', (data) => {
  //   setLookingForRideOpen(false);
  //   setWaitingForRideOpen(true);
  //   setRide(data);

  // })

  // console.log(ride);

  // socket.on('ride-started', (data) => {
  //   setRide(data);
  //   navigate('/riding', { state: { ride: ride } });
  // })

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   setVehiclePanelOpen(true)
  //   // // setPickup('');
  //   // // setDestination('');
  //   if (panelOpen) {
  //     setPanelOpen(false);
  //     // setPickup('');
  //     // setDestination('');
  //   }
  // }


  // const closePanel = (e) => {
  //   e.stopPropagation();
  //   setPanelOpen(false);
  // }

  // const handlePickupChange = async (e) => {
  //   setPickup(e.target.value);

  //   try {
  //     const response = await axios.get('http://localhost:4000/maps/get-suggestions', {
  //       params: { input: e.target.value },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     setPickupSuggestions(response.data);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  // const handleDestinationChange = async (e) => {
  //   setDestination(e.target.value);

  //   try {
  //     const response = await axios.get('http://localhost:4000/maps/get-suggestions', {
  //       params: { input: e.target.value },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     setDestinationSuggestions(response.data)
  //   } catch (error) {
  //     // handle error
  //     console.log(error);
  //   }
  // }

  // const findFare = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:4000/rides/get-fare', {
  //       params: { pickup: pickup, destination: destination },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     setFare(response.data);
  //   } catch (error) {
  //     // handle error
  //     console.log(error);
  //   }
  // }


  // const createRide = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:4000/rides/create', {
  //       pickup,
  //       destination,
  //       vehicleType
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     setRide(response.data)

  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  // useEffect(() => {
  //   // Panel animation and transitions
  //   gsap.to(panelRef.current, {
  //     height: panelOpen ? '165%' : '0%',
  //     duration: 1,
  //     ease: 'power2.out',

  //   });
  //   gsap.to(trackerRef.current, {
  //     height: panelOpen ? '0' : '60%',
  //     duration: 1,
  //     ease: 'power2.out',

  //   })
  //   gsap.to(locationPanelRef.current, {
  //     opacity: panelOpen ? 1 : 0, // Fade in/out based on panelOpen state
  //     duration: 1,
  //     // ease: 'power2.out',
  //   });

  //   // Icon fade-in/fade-out animation
  //   gsap.to(iconRef.current, {
  //     opacity: panelOpen ? 1 : 0,
  //     duration: 1,
  //     ease: 'power2.out',
  //   });

  //   // Heading fade-in/fade-out animation
  //   gsap.to(headingRef.current, {
  //     opacity: panelOpen ? 0 : 1,
  //     duration: 1,
  //     ease: 'power2.out',
  //   });
  // }, [panelOpen]);

  // useEffect(() => {
  //   gsap.to(vehiclepanelRef.current, {
  //     transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(150%)',
  //   })
  //   gsap.to(ConfirmRideRef.current, {
  //     transform: confirmRidePanelOpen ? 'translateY(0)' : 'translateY(150%)',
  //   })
  //   gsap.to(lookingForRideRef.current, {
  //     transform: lookingForRideOpen ? 'translateY(0)' : 'translateY(150%)',
  //   })
  //   gsap.to(waitingForRideRef.current, {
  //     transform: waitingForRideOpen ? 'translateY(0)' : 'translateY(150%)',
  //   })
  //   gsap.to(userProfilePanelRef.current, {
  //     transform: userProfilePanelOpen ? 'translateX(0)' : 'translateX(-100%)',
  //   })

  // }, [vehiclePanelOpen, confirmRidePanelOpen, lookingForRideOpen, waitingForRideOpen, userProfilePanelOpen]);

  const navigate = useNavigate();

  // State variables
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForRideOpen, setLookingForRideOpen] = useState(false);
  const [waitingForRideOpen, setWaitingForRideOpen] = useState(false);
  const [userProfilePanelOpen, setUserProfilePanelOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  // Contexts
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // Refs
  const trackerRef = useRef(null);
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const headingRef = useRef(null);
  const locationPanelRef = useRef(null);
  const vehiclepanelRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const lookingForRideRef = useRef(null);
  const waitingForRideRef = useRef(null);
  const userProfilePanelRef = useRef(null);

  // Socket events
  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id });

    socket.on('ride-confirmed', (data) => {
      setLookingForRideOpen(false);
      setWaitingForRideOpen(true);
      setRide(data);
    });

    socket.on('ride-started', (data) => {
      setRide(data);
      navigate('/riding', { state: { ride: data } });
    });

    return () => {
      socket.off('ride-confirmed');
      socket.off('ride-started');
    };
  }, [socket, user, navigate]);

  // Handlers
  const submitHandler = (e) => {
    e.preventDefault();
    setVehiclePanelOpen(true);
    if (panelOpen) setPanelOpen(false);
  };

  const closePanel = (e) => {
    e.stopPropagation();
    setPanelOpen(false);
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get('http://localhost:4000/maps/get-suggestions', {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get('http://localhost:4000/maps/get-suggestions', {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const findFare = async () => {
    try {
      const response = await axios.get('http://localhost:4000/rides/get-fare', {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFare(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post('http://localhost:4000/rides/create', {
        pickup,
        destination,
        vehicleType,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRide(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Animations
  useEffect(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '165%' : '0%',
      duration: 1,
      ease: 'power2.out',
    });
    gsap.to(trackerRef.current, {
      height: panelOpen ? '0' : '60%',
      duration: 1,
      ease: 'power2.out',
    });
    gsap.to(locationPanelRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 1,
    });
    gsap.to(iconRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 1,
      ease: 'power2.out',
    });
    gsap.to(headingRef.current, {
      opacity: panelOpen ? 0 : 1,
      duration: 1,
      ease: 'power2.out',
    });
  }, [panelOpen]);

  useEffect(() => {
    gsap.to(vehiclepanelRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(150%)',
    });
    gsap.to(ConfirmRideRef.current, {
      transform: confirmRidePanelOpen ? 'translateY(0)' : 'translateY(150%)',
    });
    gsap.to(lookingForRideRef.current, {
      transform: lookingForRideOpen ? 'translateY(0)' : 'translateY(150%)',
    });
    gsap.to(waitingForRideRef.current, {
      transform: waitingForRideOpen ? 'translateY(0)' : 'translateY(150%)',
    });
    gsap.to(userProfilePanelRef.current, {
      transform: userProfilePanelOpen ? 'translateX(0)' : 'translateX(-100%)',
    });
  }, [vehiclePanelOpen, confirmRidePanelOpen, lookingForRideOpen, waitingForRideOpen, userProfilePanelOpen]);




  return (
    <div className='h-screen w-screen  flex flex-col'>
      <div className={panelOpen ? 'h-[0] opacity-0' : 'flex justify-between bg-transparent items-center h-[10%] px-2 w-full'}>
        <img className="w-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="user-logo" />
        <i onClick={() => { setUserProfilePanelOpen(true) }} className="ri-user-6-fill pr-3"></i>
      </div>
      <div ref={trackerRef} className='h-[60%] w-full'>
        <div className='h-full'>
          <LiveTracking />
        </div>
      </div>
      <div className='w-full  py-2 relative'>
        {panelOpen &&
          <div className='flex justify-between items-center p-2'>
            <h1 className='font-bold text-xl'>Find a Trip</h1>
            <i onClick={() => { setPanelOpen(false) }} className="ri-arrow-down-wide-fill float-end font-bold text-2xl"></i>

          </div>
        }
        <form onSubmit={submitHandler} className='w-[95%] mx-auto'>
          <input
            onClick={() => { setPanelOpen(true), setActiveField('pickup') }}
            onChange={handlePickupChange}
            value={pickup}
            className='bg-[#eeeeee] p-3 w-full mt-3 border rounded-md'
            type="text"
            required
            placeholder='Add a pick-up location'
          />
          <input
            onClick={() => { setPanelOpen(true), setActiveField('destination') }}
            onChange={handleDestinationChange}
            value={destination}
            className='bg-[#eeeeee] p-3 w-full mt-3 border rounded-md'
            type="text"
            required
            placeholder='Enter your destination'
          />
          <button onClick={() => { console.log("find fare was called"), findFare() }} className='bg-black inline-block tracking-widest w-full text-white text-center py-3 text-xl mt-2 rounded-lg'>Find a Ride</button>
        </form>
        <div ref={panelRef} className='h-0 absolute mt-2  overflow-scroll'>
          <LocationSerchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclepanelRef} className='bg-white fixed bottom-0 hw-screen translate-y-[150%]'>
        <VehiclePanel fare={fare} setVehicleType={setVehicleType} setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>
      <div ref={ConfirmRideRef} className='bg-white fixed bottom-0 h-full w-screen translate-y-[150%]'>
        <ConfirmRide
          createRide={createRide}
          fare={fare[vehicleType]}
          pickup={pickup}
          destination={destination}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setLookingForRideOpen={setLookingForRideOpen}
        />
      </div>
      <div ref={lookingForRideRef} className='bg-white fixed bottom-0 w-screen translate-y-[150%]'>
        <LookingForRide
          fare={fare[vehicleType]}
          pickup={pickup}
          destination={destination}
        />
      </div>
      <div ref={waitingForRideRef} className='bg-white fixed bottom-0  w-screen translate-y-[150%]'>
        <WaitingForRide ride={ride} setLookingForRideOpen={setLookingForRideOpen} waitingForRideOpen={waitingForRideOpen} />
      </div>
      <div ref={userProfilePanelRef} className='bg-white fixed z-20 bottom-0 w-screen h-full translate-x-[150%]'>
        <UserProfile setUserProfilePanelOpen={setUserProfilePanelOpen} userProfilePanelOpen={userProfilePanelOpen} />
      </div>
    </div>
  );
}

export default UserHome;
