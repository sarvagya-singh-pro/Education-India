"use client";
import { AppShell,Text, Burger, Button ,Group,Avatar, Loader, Center} from '@mantine/core'
import { useEffect, useState } from 'react';
import { MdNavigateNext } from "react-icons/md";
import '@mantine/core/styles.css';

import { useRouter } from 'next/navigation';
import { Table } from '@mantine/core';
import axios from 'axios';
export default function page(props) {
  
  const router=useRouter()
  const [opened, SetOpened] = useState(false);
  const [data,SetData]=useState({})
useEffect(()=>{
  if (props.verified){
  async function a(){
  const res=await axios.get('/api/users/profile')
  console.log(res)
  SetData(res.data)
  }
  a()
}
else{
  router.push('/verify')

}
},[])
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header bg={"black"}>
        <Burger
          opened={opened}
          onClick={()=>{SetOpened(!opened)}}
          hiddenFrom="sm"
          size="sm"
          color="#fff"
        />
        <Text c={"#fff"} pt="md" pl="xl">Logo </Text>
      </AppShell.Header>

      <AppShell.Navbar p="md"  bg={"#0F141F"}>
        <Button h={"xl"} mt={"xl"} variant='filled' bg={"#0F141F"} c={"#fefefe"} >
        
            <Text ml={"sm"}>Dashboard</Text>
            </Button>
            <Button h={"xl"}  mt={"xl"}variant='filled' bg={"#0F141F"} c={"#0af"} >
        
            <Text ml={"sm"}>College</Text>
            </Button>
            <Group onClick={()=>{router.push('/profile')}}   pos={"absolute"} w="100%" left={"0px"} style={{borderTop:'1px solid white'}} bottom={"0px"} > 
            <Avatar mt="md" mb="md" radius="md"  ml={"md"}/>
            <Text c="#fff" mr={"xl"}>Profile</Text>
            <MdNavigateNext color='#fff'  size={"2rem"}/>
    </Group>
      </AppShell.Navbar>

      <AppShell.Main>
        {
          Object.keys(data).length==0?(<div >
            <Loader/>
          </div>):(
            <Table  withColumnBorders stickyHeader stickyHeaderOffset={60}>
              <Table.Thead>
        <Table.Tr>
          <Table.Th>College Name</Table.Th>
          <Table.Th><Center>Grad. Rate</Center></Table.Th>
          <Table.Th><Center>Apply</Center></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
            {data.map((element)=>{
            return(
              <Table.Tr key={element.id}>
      <Table.Td>{element.college_name}</Table.Td>
      <Table.Td><Center>{element.grad_rate}</Center></Table.Td>
     <Table.Td><Center><Button variant='light'>Apply</Button></Center></Table.Td>
    </Table.Tr>
            )
          })}
        </Table.Tbody>
          </Table>
        )

        }
        
        </AppShell.Main>
    </AppShell>
  );
}