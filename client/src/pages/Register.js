import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Register(){
    const { register }=useAuth();
    const navigate=useNavigate();
    const [data, setData]=useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [visible, setVisible]=useState({ password: false, confirmPassword: false });

    const doRegister = async (e) =>{
        e.preventDefault();
        try{
            const res=await register(data);
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

    const toggleVisibility=(field)=>{
        setVisible(prev=>({
            ...prev,
            [field]: !prev[field]
        }));
    }
    
    return(
        <div className="main-div">
            <div className="image-div">
                <img src="./assets/background.jpg" alt="background"/>
            </div>
            <h1 className="auth-text">Auth.</h1>         
            <div className="form-div">
                <div className="head-div">
                    <h1>Create a new account</h1>
                    <br/>
                    <p>Already have an account? <a href="/login">Login</a></p>
                    <br/>
                </div>
                <form className="form" onSubmit={doRegister}>
                    <input type="text" placeholder="Name" className="input" id="name" name="name" onChange={(e)=>setData({...data, name: e.target.value})}/>
                    <input type="text" placeholder="Username" className="input" id="username" name="username" onChange={(e)=>setData({...data, username: e.target.value})}/>
                    <input type="email" placeholder="Email" className="input" id="email" name="email" onChange={(e)=>setData({...data, email: e.target.value})}/>
                    <div className="password">
                        <input 
                            type={visible.password ? "text" : "password" }
                            placeholder="Password" 
                            className="input" 
                            id="password" 
                            name="password" 
                            onChange={(e)=>setData({...data, password: e.target.value})}
                        />
                        <img
                            src={visible.password ? "./assets/visibility-on.png" : "./assets/visibility-off.png"}
                            alt="visibility-toggle"
                            onClick={() => toggleVisibility("password")}
                        />
                    </div>
                    <div className="password">
                        <input 
                            type={visible.confirmPassword ? "text" : "password" }
                            placeholder="Confirm Password" 
                            className="input" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            onChange={(e)=>setData({...data, confirmPassword: e.target.value})}
                        />
                        <img
                            src={visible.confirmPassword ? "./assets/visibility-on.png" : "./assets/visibility-off.png"}
                            alt="visibility-toggle"
                            onClick={() => toggleVisibility("confirmPassword")}
                        />
                    </div>
                    <button type="submit" className="registerButton">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;