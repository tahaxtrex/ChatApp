import { create } from 'zustand';
import { axiosInstance } from "../lib/axios.js";
import { data } from 'react-router-dom';
import toast from 'react-hot-toast'
import { LogOut } from 'lucide-react';

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,


    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.log(error);
            set({authUser: null});
        } finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data, {
            headers: { "Content-Type": "application/json" }
            });

            set({authUser: res.data})
            toast.success("account created succesfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp: false});
        }
    },

    login: async(data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data, {
            headers: { "Content-Type": "application/json" }
            });

            set({authUser: res.data})
            toast.success("account created succesfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIn: false});
        }
    },

    logout: async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser: null})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }, 

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("auth/update-profile", data)
            set({authUser: res.data});
            console.log("profile updated")
        } catch (error) {
            console.log(error)
        }finally{
            set({isUpdatingProfile:false})
        }
    }

}))