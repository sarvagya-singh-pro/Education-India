"use client"
import { useEffect } from "react";
import prisma from "../database/prisma";
import axios from "axios";
export default () => {
    useEffect(()=>{
        async function a(){
        await  axios.get('/api/users/profile')

        }
        a()
        
    },[])
    return (
        <div>
            Profile
            <button onClick={async ()=>{
               await axios.get('api/users/logout')
               window.location.reload()
            }}>Logout</button>
        </div>
    );
}