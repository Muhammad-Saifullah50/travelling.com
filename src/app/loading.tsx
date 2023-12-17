'use client'
import Image from 'next/image'
import { Oval } from 'react-loader-spinner'
const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[70vh]'>
            <Oval
                height={80}
                width={80}
                color="#0369a1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#2563eb"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
    )
}

export default Loading
