"use client";
import { useState,useEffect } from "react";
import { Table,Loader,Center,Button } from "@mantine/core";
import axios from "axios";
const Tables = () => {
    const [data,SetData]=useState({})
    useEffect(()=>{
        async function a(){
        const res=await axios.get('/api/users/profile')
        console.log(res)
        SetData(res.data)
        }
        a()
    
      },[])
      
    return (
        <div>
            {
          Object.keys(data).length==0?(<div >
            <Loader/>
          </div>):(
               <Table.ScrollContainer type="scrollarea"  h={500}>
            <Table  withColumnBorders  >
             
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
          </Table.ScrollContainer>
        )

        }
        </div>
    );
}

export default Tables;