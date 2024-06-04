import { cookies } from 'next/headers'
import Dashboard from '../../components/Dashboard'
const page = async() => {
    const cookieStore=cookies()
    const token = cookieStore.get('token')

    return (
        <div>

            <Dashboard verified={token?true:false}/>
        </div>
    );
}

export default page;