"use client"
import '@mantine/core/styles.css';
import { Button } from "@mantine/core";
import axios from "axios";
const page = () => {
    return (
        <div>
            <Button color='red' onClick={()=>{axios.get('/api/users/logout')}}>Logout</Button>
        </div>
    );
}

export default page;