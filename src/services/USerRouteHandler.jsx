import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function USerRouteHandler() {
  const token = localStorage.getItem("token");
console.log("token is"+ token);

  if(!token){
    return <Navigate to={"/login"} />
  }

  const userdata = jwtDecode(token);
  console.log("role"+ userdata.role);
  
  if(userdata.role != "customer" && userdata.role != "admin"){
    return <Navigate to={"/unauthorized"} />
  }

  return <Outlet/>
}

export default USerRouteHandler