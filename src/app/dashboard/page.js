import { cookies } from 'next/headers'
import { getUserData } from '@/helper/cookiedata';

const page = async() => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const verified=(await getUserData(token.value)).verified
    console.log(verified)
    return (
        <div>

            {/* <Dashboard verified={verified}/> */}
        </div>
    );
}

export default page;