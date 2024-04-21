"use client"
import '@mantine/core/styles.css';
import { Title,TextInput, Center,Text,Button } from '@mantine/core';
import styles from './styles/otp.module.css'
import React,{ useState ,useRef} from 'react';
import { useRouter } from 'next/navigation';
import OtpInput from './OTPEntry.jsx'
import axios from 'axios';
const Otp = (props) => {
    const router=useRouter()
   const [otp,SetOtp]=useState("")
   const handleData = (data) => {
    console.log(data)
    SetOtp(data);
  };
    return (
        <div>
            <div className={styles.landing}>
                <div className={styles.form}>
                <Title pt={"lg"} order={2} ta={"center"}>Enter the verification Token</Title>
               <Center> <Text ta="center"  pt="md" c={"gray"}>Enter the 4-digit verification code that was sent to your phone number</Text>
               </Center>
            <OtpInput otpParent={handleData}/>
               
      
      <Center><Button onClick={async()=>{
      const res=await axios.post('/api/users/verify',{otp:otp})
        if (res.status==200){
            router.push('/dashboard')
        }
        else{
            alert("wrong verification code")
        }
      
      }}  mt="xl" varient="filled" color='indigo'>Verify</Button></Center>
                </div>
                  
            </div>
        </div>
    );
}

export default Otp;