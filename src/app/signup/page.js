"use client"
import axios from "axios";
import { useState } from "react";
const page = () => {
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const[name,SetName]=useState("")
    const[verify,Setverify]=useState("")
    return (
        <div>
            <div>
            <h1>Sign Up</h1>
            <input placeholder="Name" value={name} onChange={(e)=>{SetName(e.target.value)}}></input>
            <input placeholder="Email" onChange={(e)=>{SetEmail(e.target.value)}} value={email} ></input>
            <input placeholder="Password" onChange={(e)=>{SetPassword(e.target.value)}} value={password} ></input>
            <input placeholder="verification" onChange={(e)=>{Setverify(e.target.value)}} ></input>
            
            <button onClick={()=>{
                axios.post('/api/users/signup',{
                    name,
                    email,
                    password
                })
            }} >SignUp</button>
            <button  onClick={()=>{
                axios.post('/api/users/verify',{
                    "type":"verify",
                    verify
                })}} >
                    Verify
            </button>
            <button >Login</button>
        </div>
        </div>
    );
}

export default page;