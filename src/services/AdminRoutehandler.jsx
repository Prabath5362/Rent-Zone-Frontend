import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutehandler() {
  const token = localStorage.getItem("token");

  if(!token){
    return <Navigate to={"/login"} replace/>
  }

  const userdata = jwtDecode(token);

  if(userdata.role != "admin"){
    return <Navigate to={"/unauthorized"} />
  }

  return <Outlet/>
}

export default AdminRoutehandler