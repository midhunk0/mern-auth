// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Login(){
    const navigate=useNavigate();
    const { login }=useAuth();
    const [data, setData]=useState({
        username: "",
        password: ""
    })
    const [visible, setVisible]=useState(false);

    const doLogin = async (e) => {
        e.preventDefault();
        try{
            const res=await login(data);
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
    };

    const toggleVisibility=()=>{
        setVisible(!visible);
    }

    return(
        <div className="main-div">
            <div className="image-div">
                <img src="./assets/background.jpg" alt="background"/>
            </div>
            <h1 className="auth-text">Auth.</h1>         
            <div className="form-div">
                <div className="head-div">
                    <h1>Login to your account</h1>
                    <br/>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <br/>
                </div>
                <form className="form" onSubmit={doLogin}>
                    <input type="text" placeholder="Username" className="input" id="username" name="username" onChange={(e)=>setData({...data, username: e.target.value})}/>
                    <div className="password">
                        <input 
                            type={ visible ? "text" : "password"} 
                            placeholder="Password" 
                            className="input" 
                            id="password" 
                            name="password" 
                            onChange={(e)=>setData({...data, password: e.target.value})}
                        />
                        {visible ? (
                            <img src="./assets/visibility-on.png" alt="visibility-on" onClick={toggleVisibility}/>
                        ) : (
                            <img src="./assets/visibility-off.png" alt="visibility-off" onClick={toggleVisibility}/>
                        )}
                    </div>
                    <button type="submit" className="loginButton">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;