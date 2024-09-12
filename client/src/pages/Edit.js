// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Edit(){
    const { user, updateProfile }=useAuth();
    const navigate=useNavigate();
    const [data, setData]=useState({
        name: "",
        email: "",
    })

    useEffect(()=>{
        if(user){
            setData({
                name: user.name,
                email: user.email
            })
        }
    }, [user]);

    const doUpdate=async(e)=>{
        e.preventDefault();
        try{
            const res=await updateProfile(data);
            if(res.ok){
                toast.success(res.message);
                navigate("/dashboard");
            }
            else{
                toast.error(res.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const goBack=()=>{
        navigate("/dashboard");
    }

    return(
        <div className="main-div">
            <div className="image-div">
                <img src="./assets/background.jpg" alt="background"/>
            </div>
            <div className="form-div">
                <div className="head-div">
                    <h1>Update account details</h1>
                    <br/>
                </div>
                <form className="form" onSubmit={doUpdate}>
                    <input type="text" placeholder="Name" className="input" id="name" name="name" onChange={(e)=>setData({...data, name: e.target.value})}/>
                    <input type="email" placeholder="Email" className="input" id="email" name="email" onChange={(e)=>setData({...data, email: e.target.value})}/>
                    <button type="button" className="backButton" onClick={goBack}>Go Back</button>
                    <button type="submit" className="updateButton">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Edit;