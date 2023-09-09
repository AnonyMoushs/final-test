import { useEffect, useRef, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Axios from 'axios';

const PrivateRoutes = () => {

  Axios.defaults.withCredentials = true

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const data = useRef()
  

  useEffect(() => {

    Axios.get("http://localhost:3001/LoggedIn").then((response) => {

    console.log(response)
      
    data.current = response.data.Message

    if(data.current === "Authorized") {

      setIsAuthenticated(true)

    } else {

      setIsAuthenticated(false)

    }
   
    })

  
  })




  
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;

};

export default PrivateRoutes
