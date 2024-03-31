"use client"
import { useState } from "react";
import axios from "axios";
const page = () => {
    const[email,SetEmail]=useState("")
    const[password,SetPassword]=useState("")
    const[verify,SetVerify]=useState("")
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
            <button onClick={()=>{
                axios.post('/api/users/forgot',{email})
            }}>
                forgot
            </button>
            <input value={verify} onChange={(e)=>{SetVerify(e.target.value)}}></input>
            <button onClick={()=>{axios.post('/api/users/verify',{
                    "type":"forgot",
                    "tokenGiven":verify,
                    "email":email,
                })}} >verify</button>
        </div>
    );
}

export default page;