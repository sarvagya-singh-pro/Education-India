import '@mantine/core/styles.css';
import { Center, Input, Title,Text, Button, PasswordInput, Anchor, Modal, TextInput } from '@mantine/core';
import styles from './styles/auth.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OTPEntry from './OTPEntry';
const Auth = (props) => {
    const router = useRouter()
    const[name,SetName]=useState("")
    const [phone,SetPHONE]=useState("")
    const [password,SetPASSWORD]=useState("")
    const [phoneLogin,SetPHONELogin]=useState("")
    const [passwordLogin,SetPasswordLogin]=useState("")
    const[modalForgot,SetModalForgot]=useState(false)
    const[forgot,SetForgot]=useState("")
    const [mode,SetMode]=useState("signup")
    const[otpInput,SetInput]=useState(false)
    const[otpInputText,SetInputText]=useState("")
    
    function handleOtp(data){
      console.log(data)
      SetInputText(data)
    }
    return (
        <div>
            <Modal opened={modalForgot} onClose={()=>{SetModalForgot(false);SetInputText("")}}>
              {otpInput?<><Center><Text mb="md">Enter The OTP</Text></Center>
              <OTPEntry otpParent={handleOtp} ></OTPEntry>
              <Center><Button onClick={()=>{axios.post('/api/users/forgot',{phone:forgot,type:'otp',otp:otpInputText})}} mt="xl"  color='green'>Verify</Button></Center>
              </>:
              <><Center><Text mb="md">Your Phone Number</Text></Center>
              
              <Center><TextInput size='lg' onChange={(e)=>{SetForgot(e.target.value)}} value={forgot} placeholder='Number'/></Center>
              <Center><Button onClick={()=>{axios.post('/api/users/forgot',{phone:forgot,type:'phone'}).then(()=>{SetInput(true)})}} color='green' mt="xl">Verify</Button></Center>
              </>}
            </Modal>

            <div className={styles.signup}>
           {mode=="login"?<>
           
           <Center><Title className={styles.title} order={1} fw={"lighter"} mt="xl" >Login</Title></Center>
           <Input onChange={(e)=>{SetPHONELogin(e.target.value)}}  ml={"50%"} value={phoneLogin}  w="80%" size={"xl"} style={{transform:'translateX(-50%)',boxShadow:'10px 10px  10px #ccc '}} leftSection={<><Text>+91 </Text></>} placeholder='Phone'  pattern="/^\d+$/"
            mt="xl"></Input>
              <PasswordInput  onChange={(e)=>{SetPasswordLogin(e.target.value)}} w="80%" value={passwordLogin} mt={"lg"} ml={"50%"} style={{transform:'translateX(-50%)',boxShadow:'10px 10px  10px #ccc '}} size={'xl'} placeholder='Password'></PasswordInput>
              <Center> <Button mt={"xl"}  onClick={()=>{axios.post('/api/users/login',{
            phone:phoneLogin,
            password:passwordLogin
          }).then(()=>{router.push('/dashboard')}).catch((err)=>{console.log(err)})}} variant="light" color="cyan" size="lg"> Log In </Button></Center>
        <Center><Button mt="md" variant='light' onClick={()=>{SetModalForgot(true)}}>Forgot Password</Button></Center>
              <Center><Text pt={"lg"}>Dont have An account? <Anchor underline='never' onClick={()=>{SetMode("signup")}} >Sign Up</Anchor> </Text></Center>
        
           
           </>:
          <>
           <Center><Title className={styles.title} order={1} fw={"lighter"} mt="xl" > Sign Up</Title></Center>
          <Input onChange={(e)=>{SetPHONE(e.target.value)}}  ml={"50%"} value={phone}  w="80%" size={"xl"} style={{transform:'translateX(-50%)',boxShadow:'10px 10px  10px #ccc '}} leftSection={<><Text>+91 </Text></>} placeholder='Phone'  pattern="/^\d+$/"
            mt="xl"></Input>
            <Input onChange={(e)=>{SetName(e.target.value)}}placeholder='Name' value={name} mt={"lg"} ml={"50%"} style={{transform:'translateX(-50%)',boxShadow:'10px 10px  10px #ccc '}} w="80%" size={'xl'}></Input>
           <PasswordInput  onChange={(e)=>{SetPASSWORD(e.target.value)}} w="80%" value={password} mt={"lg"} ml={"50%"} style={{transform:'translateX(-50%)',boxShadow:'10px 10px  10px #ccc '}} size={'xl'} placeholder='Password'></PasswordInput>
          <Center> <Button mt={"xl"}  onClick={()=>{axios.post('/api/users/signup',{
            name,
            phone,
            password
          }).then(()=>{router.push('/verify')}).catch(()=>{alert("sign up failed")})}} variant="light" color="cyan" size="lg"> Sign Up </Button></Center>
           <Center><Text pt={"lg"}>Already Have an account? <Anchor underline='never' onClick={()=>{SetMode("login")}} >Login</Anchor> </Text></Center>
           </>}
           
           </div>
           <div className={styles.sideImg}></div>

           </div>
    );
 }
 
 export default Auth;