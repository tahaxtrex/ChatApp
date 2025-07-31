import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useChatStore = create((set)=>({
    users: [],
    messages: [],
    selectedUser: null,
    isLoadingUsers: false,
    isLoadingMessages:false,

    getUsers: async()=>{
        set({isLoadingUsers: true})
        try {
            const res = await axiosInstance.get("/message");{}
            set({users: res.data})
        } catch (error) {
            console.log(error)
        }finally{
            set({isLoadingUsers: false})
        }
    },

    getmessages: async(userId)=>{
        set({isLoadingMessages: true});
        try {
            const res = await axiosInstance.get(`/${userId}`);{}
            set({messages: res.data})
        } catch (error) {
            console.log(error)
        }finally{
            set({isLoadingMessages: false})
        }
    },

    setSelectedUser: async(selectedUser)=>({selectedUser}),
}))