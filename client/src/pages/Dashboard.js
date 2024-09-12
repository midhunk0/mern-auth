// @ts-nocheck
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Dashboard=()=>{
    const navigate=useNavigate();
    const { user, fetchProfile, logout, deleteAccount }=useAuth();

    useEffect(()=>{
        const getProfile=async()=>{
            await fetchProfile();
        }
        getProfile();
    }, [fetchProfile]);

    const toEdit=()=>{
        navigate("/edit");
    }

    const doDelete=async(e)=>{
        e.preventDefault();
        if(window.confirm("Do you really want to delete your account?")){
            const res=await deleteAccount();
            if(res.ok){
                toast.success(res.message);
                navigate("/register");
            }
            else{
                toast.error(res.message);
            }
        }
    }

    const doLogout=async()=>{
        const res=await logout();
        if(res.ok){
            toast.success(res.message);
            navigate("/");
        }
        else{
            toast.error(res.message);
        }
    }

    if (!user) {
        return <div>Loading...</div>;  // Handle case where user is not yet loaded
    }

    return(
        <div className="main-div">
            <div className="image-div">
                <img src="assets/background.jpg" alt="background"/>
            </div>
            <div className="buttons-div">
                <div className="head-div">
                    <h1>Hello, {user?.name || 'Anonymous User'}</h1>
                    <br/>
                </div>
                <div className="buttons">
                    <button type="button" className="logoutButton" onClick={doLogout}>Logout</button>
                    <button type="button" className="editButton" onClick={toEdit}>Edit</button>
                    <button type="button" className="deleteButton" onClick={doDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;











