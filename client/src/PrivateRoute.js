/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const PrivateRoute=({ children })=>{
    const { token }=useAuth();
    if(!token){
        return <Navigate to="/"/>
    }
    return children;
}

export default PrivateRoute;