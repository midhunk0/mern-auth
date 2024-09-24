/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const login = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (response.ok) {
                setUser(result.user);
                setToken(result.token);
                localStorage.setItem('token', result.token);
            }
            return { message: result.message, ok: response.ok};
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };


    const register = async (userData) => {
        try {
            const response=await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result=await response.json();
            if(response.ok){
                setUser(result.user);
                setToken(result.token);
                localStorage.setItem("token", result.token);
            }
            return { message: result.message, ok: response.ok };
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    };

    const fetchProfile = async () => {
        try {
            const response=await fetch(`${API_URL}/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(response.ok){
                const result=await response.json();
                setUser(result.user);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const logout = async() => {
        try{
            const response=await fetch(`${API_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const result=await response.json();
            if(response.ok){
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            }
            return { message: result.message, ok: response.ok };
        }
        catch(err){
            console.log("Logout failed: ", err);
            return false;
        }
    };

    const updateProfile = async (userData) => {
        try {
            const response=await fetch(`${API_URL}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            const result=await response.json();
            if(response.ok){
                setUser(result.user)
            }
            return { message: result.message, ok: response.ok };
        } catch (error) {
            console.error('Failed to update profile:', error);
            return false;
        }
    };

    const deleteAccount = async () => {
        try {
            const response = await fetch(`${API_URL}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result=await response.json();
            if(response.ok){
                logout();
            }
            return { message: result.message, ok: response.ok };
        } catch (error) {
            console.error('Failed to delete account:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, fetchProfile, logout, updateProfile, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


