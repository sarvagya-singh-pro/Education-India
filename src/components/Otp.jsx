"use client"
import '@mantine/core/styles.css';
import { Title,TextInput, Center,Text,Button } from '@mantine/core';
import styles from './styles/otp.module.css'
import React,{ useState ,useRef} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const Otp = (props) => {
    const router=useRouter()
    const [otp, setOtp] = useState(['', '', '', '','', '']);
    const refs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(),React.createRef(), React.createRef()]);
    
    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value !== '' && index < otp.length - 1) {
          refs.current[index + 1].current.focus();
        }
      };
    
      const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
          refs.current[index - 1].current.focus();
        }
      };  
    return (
        <div>
            <div className={styles.landing}>
                <div className={styles.form}>
                <Title pt={"lg"} order={2} ta={"center"}>Enter the verification Token</Title>
               <Center> <Text ta="center"  pt="md" c={"gray"}>Enter the 4-digit verification code that was sent to your phone number</Text>
               </Center><div className={styles.input}>

                {otp.map((value, index) => (
<div className={styles.formInput}>
<TextInput
          key={index}
          ref={refs.current[index]}
          value={value}
          ta={"center"}
          style={{  width:50,height:39,fontSize: 24, textAlign: 'center', borderRadius: 4, border: '1px solid #ced4da' }}
     
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
         
        /></div>
      ))}
      </div>
      <Center><Button onClick={async()=>{
      const res=await axios.post('/api/users/verify',{otp:otp.join('')})
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