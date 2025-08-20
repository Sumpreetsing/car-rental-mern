import {createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

export const AppContext=createContext();

export const AppProvider=({children})=>{

    const navigate=useNavigate()
    const currency=import.meta.env.VITE_CURRENCY
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null)
    const [isOwner,setIsOwner]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [pickUpDate,setPickUpDate]=useState('')
    const [returnDate,setReturnDate]=useState('')
    const [cars,setCars]=useState([])


    // Function to check whether the user is logged in
    const fetchUser=async()=>{
        try {
          const {data}=  await axios.get('/api/user/data')
          if(data.success){
            setUser(data.user)
            setIsOwner(data.user.role==='owner')
          }
          else{
            navigate('/')
          }
        } catch (error) {

            toast.error(error.message)
            
        }
    }

    // function to fetch cars from server
    const fetchCars=async()=>{
        try {
           const {data}= await axios.get('/api/user/cars')
           data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }


    // useEffect to retrive the token from localstorage
    useEffect(()=>{
        const token=localStorage.getItem('token')
        setToken(token)
    },[])

    // useEffect to fetch userdata when token is available
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
        }
    },[token])

    const value={
        navigate,currency,
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
}