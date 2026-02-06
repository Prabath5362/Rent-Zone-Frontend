import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function USerRouteHandler() {
  const token = localStorage.getItem("token");

  if(!token){
    return <Navigate to={"/login"} />
  }

  const userdata = jwtDecode(token);

  
  if(userdata.role != "customer" && userdata.role != "admin"){
    return <Navigate to={"/unauthorized"} />
  }

  if(userdata.role === "admin"){
    return <Navigate to={"/admin"} />
  }

  return <Outlet/>
}

export default USerRouteHandler