"use client";
import { BackgroundImage, Center, Image,Text, Title,useMatches } from '@mantine/core';
const landing = () => {
    const sizes = useMatches({
        base: '5rem',
        sm: '5rem',
        lg: '12rem',
      });
    return (
        <div>
            <BackgroundImage src={'/assets/landing.jpg'} >
                <div style={{
                    width:'100%',
                    height:'100vh',
                    background:'rgba(0,55,200,0.5)'
                }} >
                    <Title pt={"xl"} order={1} size={sizes}  pl={"md"} c={"#fff"}>Education India</Title>

                </div>
            </BackgroundImage>
            <div style={{width:'100%',minHeight:'50vh'}}>
               <Center> <Title c={"blue"} pt={"xl"} order={1} fw={500}>What we do?</Title></Center>
                <Center><Text ta={"center"} pt={"xl"} w={"90%"} fs={"xl"}>Education india is awesome pls give us money mperdiet conubia rhoncus suscipit condimentum molestie est! Amet nec non tellus posuere nisl ad felis conubia duis nam turpis montes. Non leo, sociis urna tempor lacus eros. Duis tempus suspendisse curae; habitasse neque sociis ullamcorper per enim odio id. Massa quisque sociis bibendum. Netus sit himenaeos odio cras ridiculus vestibulum! Bibendum fringilla per leo, odio class hendrerit lectus sodales dolor pharetra? Est cursus donec fames torquent nisi pulvinar. Dignissim sociis vestibulum, auctor aliquet felis vehicula pellentesque tempus ligula mattis.</Text></Center>
            </div>
        </div>
    );
}

export default landing;