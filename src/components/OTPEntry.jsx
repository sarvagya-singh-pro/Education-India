"use client"
import React,{ useState,useRef } from "react";
import { TextInput } from "@mantine/core";
import styles from './styles/otp.module.css'
const OTPEntry = ({otpParent}) => {
    const [otp, setOtp] = useState(['', '', '', '','', '']);
    const refs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(),React.createRef(), React.createRef()]);
    
    const handleChange = async(index, value) => {
        const newOtp = Array.from(otp);
        console.log(index)
        newOtp[index] = value;
        setOtp(newOtp);
        console.log(otp)
        if (value !== '' && index < otp.length - 1) {
          refs.current[index + 1].current.focus();
        }
        otpParent(newOtp.join("")); 
      };
    
      const handleKeyDown = (index, e) => {
         
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
          refs.current[index - 1].current.focus();
        }
         
      };

    return (
        <div>
            <div className={styles.input}>
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
        </div>
    );
}

export default OTPEntry;