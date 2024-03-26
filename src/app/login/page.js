"use client"
import { useState } from "react";
import axios from "axios";
const page = () => {
    const[email,SetEmail]=useState("")
    const[password,SetPassword]=useState("")
    return (
        <div>
            <h1>Login</h1>
            <input placeholder="Email" value={email} onChange={(e)=>{SetEmail(e.target.value)}} ></input>
            <input placeholder="Password" value={password} onChange={(e)=>{SetPassword(e.target.value)}} ></input>
            <button onClick={()=>{
                 axios.post('/api/users/login',{
                    
                    email,
                    password
                })
            }}  >Login</button>
            <button >SignUp</button>
        </div>
    );
}

export default page;