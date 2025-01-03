import React,{useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { UserDataContext } from "../context/UserContext";
import axios from "axios";



const UserProtectWraper = ({ children }) => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoding, setIsLoding] = useState(true);



  useEffect(() => {

    if (!token) {
      navigate('/login');
    }
    axios.get("http://localhost:4000/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoding(false);
      }
    }).catch((err) => {
      console.log(err);
      localStorage.removeItem('token');
      navigate('/login');

    })
  }, [token]);

  if (isLoding) {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWraper