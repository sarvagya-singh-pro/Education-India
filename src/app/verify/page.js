import { cookies } from 'next/headers'

const page = async() => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    
    return (
        <div>
            <OtpInput />
        </div>
    );
}

export default page;